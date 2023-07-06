import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { log } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserEntity>,
  ) {}

  async findAll() {
    const result = await this.userModel.find().exec();
    // if (result.length == 0) throw new NotFoundException('No products');
    return result;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    let user;
    try {
      user = await this.userModel.findOne({ email: email });
    } catch (error) {
      throw new NotFoundException('Could not find user.'); //server error (id invalid)
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    // const newUser: UserEntity = {
    //   id: uuid(),
    //   ...createUserDto,
    // };
    const newUser = new this.userModel(createUserDto);
    const result = await newUser.save();
    // this.users.push(newUser);
    return result;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    // const index: number = this.users.findIndex((user) => user.id == id);
    let updated;
    try {
      updated = await this.userModel.findByIdAndUpdate(id, updateUserDto);
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    // if (updated.length==0) {
    //   throw new NotFoundException('Could not find user.');
    // }
    // if(index == -1){
    //   throw new NotFoundException('Could not find user.');
    // }
    // this.users[index] = {
    //   ...this.users[index],
    //   ...updateUserDto,
    // };
    // return this.users[index];

    return updated;
  }

  async removeUser(id: string) {
    let result;
    try {
      await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new NotFoundException('Could not find user.')
    }
      // if (result == null) {
      //   throw new NotFoundException('Could not find user.....')
      // }
  }
}
