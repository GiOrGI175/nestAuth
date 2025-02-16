import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { signUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { signInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private JwtService: JwtService,
  ) {}

  async signUp({ email, firstName, lastName, password }: signUpDto) {
    const existsUser = await this.userModel.findOne({ email });
    if (existsUser) throw new BadRequestException('user already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userModel.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    return 'user registered successfully';
  }

  async signIn({ email, password }: signInDto) {
    const existUser = await this.userModel.findOne({ email });
    if (!existUser)
      throw new BadRequestException('email or password is invalid');

    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual)
      throw new BadRequestException('email or password is invalid');

    const payLoad = {
      userId: existUser._id,
    };

    const accesToken = await this.JwtService.sign(payLoad, { expiresIn: '1h' });

    return { accesToken };
  }

  async getCurrentUser(userId) {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }
}
