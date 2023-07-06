import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskEntity>,
  ) {}


  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = new this.taskModel(createTaskDto);
    const result = await newTask.save();
    // this.users.push(newUser);
    return result
  }

  async findAll() {
    const result = await this.taskModel.find().exec();
    // if (result.length == 0) throw new NotFoundException('No products');
    return result;
  }

  async findEmail(email: string) {
    let user;
    try {
      user = await this.taskModel.find({ EmailUser: email });
    } catch (error) {
      throw new NotFoundException('Could not find user.'); //server error (id invalid)
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    // const index: number = this.users.findIndex((user) => user.id == id);
    let updated;
    try {
      updated = await this.taskModel.findByIdAndUpdate(id, updateTaskDto);
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!updated) {
      throw new NotFoundException('Could not find user.');
    }
    return updated;
  }

  async removeTask(id: string) {
    let task;
    try {
      task = await this.taskModel.findOneAndDelete({_id: id });
    } catch (error) {
      throw new NotFoundException('Could not find user.')
    }
    if (!task) {
      throw new NotFoundException('Could not find user.');
    }
  }
}
