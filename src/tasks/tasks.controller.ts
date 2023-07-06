import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid'
import path from 'path';


export const storage = {
  storage: diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;  //l'extention

      cb(null, `${filename}${extension}`) // cb = call back function : bch trajaa l file name kima ahna 7abineh
    }
  })
}

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  // @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':email')
  findEmail(@Param('email') email: string) {
    return this.tasksService.findEmail(email);
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.removeTask(id);
    
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage ))
  uploadFile(@UploadedFile() file): Observable<Object> {
    console.log(file);
    return of({imagePath: file.filename});
  }
}
