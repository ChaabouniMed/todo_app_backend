import { IsEmail, IsString, Length, length } from 'class-validator';
import { isMap } from 'util/types';

export class CreateUserDto {
  @IsString()
//   @Length(3,20,{groups: ['create']})
//   @Length(5,25,{groups: ['update']})
@Length(3,20)
  username: string; //required

  @IsEmail({},{message: "incorrect email"})
  email: string; //required

  @IsString() //lezma bch yekhedhha b3in l e3tibar, maaneha lezem kbal kol atrribut naaml decorator khatr fl main keteb hedhi : app.useGlobalPipes(new ValidationPipe({whitelist: true})); 
  password: string; //required

}
