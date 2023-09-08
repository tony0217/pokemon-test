import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
})
export class User {
  @Prop({ default: new Types.ObjectId(), auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    select: false,
  })
  password: string;

  @Prop()
  fullName: string;

  @Prop({
    default: true,
  })
  isActive: boolean;

  @Prop({
    array: true,
    default: ['user'],
  })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
