import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { SigninUserDto } from './dtos/sighin_user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  LogIn(@Body() logInDto: LoginUserDto) {
    return this.authService.LogIn(logInDto.email, logInDto.password);
  }

    @Post('signin')
    signIn(@Body() signInDto: SigninUserDto) {
    return this.authService.SignIn(signInDto);
  }

}