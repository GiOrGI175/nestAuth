import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@Schema()
export class Post {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  constent: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Schema.Types.ObjectId;
}

export const postsSchema = SchemaFactory.createForClass(Post);
