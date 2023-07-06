import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = TaskEntity & Document;

@Schema()
export class TaskEntity {
  @Prop({ required: true })
  EmailUser: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  url: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskEntity);
