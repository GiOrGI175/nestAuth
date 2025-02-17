import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role } from 'src/enums/roles.enum';
import { Subscription } from 'src/enums/subscription.enum';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  firstName: String;

  @Prop({ type: String })
  lastName: String;

  @Prop({ type: String })
  email: String;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: string;

  @Prop({ type: String, enum: Subscription, default: Subscription.FREE })
  subscriptionPlan: string;

  @Prop({ type: String, default: '' })
  profilePicture: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Post', default: [] })
  posts: mongoose.Schema.Types.ObjectId[];
}

export const userSchema = SchemaFactory.createForClass(User);
