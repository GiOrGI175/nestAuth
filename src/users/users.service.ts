import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/posts/schema/post.schema';
import { AwsS3Service } from 'src/upload/aws-s3.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModel: Model<Post>,
    private awsS3Service: AwsS3Service,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existUser) throw new BadRequestException('user Aready exists');

    const user = await this.userModel.create(createUserDto);

    return user;
  }

  async uploadProfilePicture(id: string, file: Express.Multer.File) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid id');

    const filePath = `users/${id}/profile-picture/`;
    const fileUrl = await this.awsS3Service.uploadFile(filePath, file);

    // აქ ესე გავაკეთე მარა ამხე urlს რო აბრუნებს ნორმალუია? დიდხანს უნდება თან ამის ჩასმაც ჭედავს D თუ არი რამე სხვა გზაც
    const url = await this.awsS3Service.getFileById(filePath);

    const user = await this.userModel.findByIdAndUpdate(
      id,
      { profilePicture: url },
      { new: true },
    );

    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  findAll() {
    return this.userModel
      .find()
      .populate({ path: 'posts', select: '-user -__v' });
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('ivalid id');

    const user = await this.userModel.findById(id);

    if (!user) throw new BadRequestException('user not fund');

    return user;
  }

  async update(
    role: string,
    tokenId: string,
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    if (tokenId !== id && role !== 'admin')
      throw new UnauthorizedException('permition dined');

    if (!isValidObjectId(id)) throw new BadRequestException('ivalid id');
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    if (!updatedUser) throw new BadRequestException('user not found');

    return updatedUser;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('ivalid id');

    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) throw new BadRequestException('user not found');

    await this.postModel.deleteMany({ user: deletedUser._id });

    return deletedUser;
  }
}
