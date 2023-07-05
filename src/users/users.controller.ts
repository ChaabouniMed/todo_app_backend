import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import path from 'path';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { CustomValidationPipe } from './pipes/validation.pipe';
import { UsersService } from './users.service';

@Controller('user')
// @UsePipes(ValidationPipe)  =>  zeyed khatr aameltha fl main donc temchi aal kol
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Get()
  findAll(
    // @Query("username", CustomValidationPipe) username: string   // postman : localhost:3000/user?username=mohamed
  ): Promise<UserEntity[]> {
    // console.log(username);
    return this.userService.findAll();
  }

  // @Get(':email')
  // findOne(@Param('email'
  // // , ParseUUIDPipe
  // ) email: string): Promise<UserEntity | undefined> {    
  //   return this.userService.findUserByEmail(email);
  // }
  @Post()
  create(@Body(
    // new ValidationPipe({groups: ['create']}) => louken nheb naaml fl create haja wfl update haja okhra, awki fl DTO wadhha (Rp: lezem ennahi hedhi ml main : app.useGlobalPipes(new ValidationPipe);)
  ) createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  // @Post()
  // create2(@Req() req : Request): String {
  //   console.log(req.body);
  //   return "post with request"
  // }

  @Patch(':id')
  update(
    @Param('id'
    // , ParseUUIDPipe
    ) id: string,
    @Body(
      // new ValidationPipe({groups: ['update']}) => louken nheb naaml fl create haja wfl update haja okhra
    ) updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.updateUser(id,updateUserDto)
  }

  @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT) //204
  delete(@Param('id'
  // , ParseUUIDPipe
  ) id: string) {
    return this.userService.deleteUser(id);
  }
}
