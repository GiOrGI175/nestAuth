import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { Post, postsSchema } from 'src/posts/schema/post.schema';
import { AwsS3Module } from 'src/upload/aws-s3.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: Post.name, schema: postsSchema },
    ]),
    AwsS3Module,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
