import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private postModel: Model<Post>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async create(userId, createPostDto: CreatePostDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('user not found');

    const newPost = await this.postModel.create({
      ...createPostDto,
      user: user._id,
    });

    await this.userModel.findByIdAndUpdate(user._id, {
      $push: { posts: newPost._id },
    });

    return newPost;
  }

  findAll() {
    return this.postModel
      .find()
      .populate({ path: 'user', select: '-posts -createdAt -__v' });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
