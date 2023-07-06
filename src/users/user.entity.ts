import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserEntity & Document;

@Schema()
export class UserEntity {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

	@Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);








// import * as mongoose from 'mongoose'

// export const UserSchema = new mongoose.Schema({

//     username: {type: String,required: true},

//     email: {type: String,required: true},

//     password: {type: String,required: true},

// })

// export class UserEntity {

//     id: string;

//     username: string;

//     email: string;

//     password: string;
    
// }

