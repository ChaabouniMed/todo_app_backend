import { IsEmail, IsString, Length, length } from 'class-validator';
import { isMap } from 'util/types';

export class LoginUserDto {
  @IsEmail({},{message: "incorrect email"})
  email: string; //required

  @IsString() //lezma bch yekhedhha b3in l e3tibar, maaneha lezem kbal kol atrribut naaml decorator khatr fl main keteb hedhi : app.useGlobalPipes(new ValidationPipe({whitelist: true})); 
  password: string; //required

}
