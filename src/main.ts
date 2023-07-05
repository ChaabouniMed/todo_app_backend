import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true,forbidNonWhitelisted: true}));  //whitelist: true => bch tna7ili l 7weyej li mouch moujoudin fl dto ama ma tkharajlich error, bch tkharajli error nzid wala nbadel b : forbidNonWhitelisted: true
  await app.listen(3000);
}
bootstrap();
