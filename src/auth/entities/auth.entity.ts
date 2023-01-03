import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Role } from './role.enum';

export type AuthDocument = Auth & Document;

@Schema({
  toJSON: {
    //this is to lite the response data
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
      delete ret.salt;
      delete ret.createdAt;
      delete ret.updatedAt;
    },
  },
  timestamps: true,
})
export class Auth {
  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  address: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, enum: Role, default: Role.ADMIN })
  role: Role;

  @Prop()
  phone: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: null })
  paymentStatus: string;

  @Prop({ default: null })
  code: string;

  @Prop({ default: new Date() })
  membershipStartDate: Date;

  @Prop({ min: 0, max: 5 })
  active: number;

  @Prop({ default: new Date() })
  membershipEndDate: Date;

  // @Prop({
  //   default: [],
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  //   unique: false,
  // })
  // wishlist: Movie[];
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
