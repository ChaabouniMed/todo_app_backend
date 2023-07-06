import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  EmailUser: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  url?: string;
}
