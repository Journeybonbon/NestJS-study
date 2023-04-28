import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";
import * as path from "path"
import { ValidationPipe } from '@nestjs/common';
import { logger3 } from './logger3.middleware';

dotenv.config({
  path: path.resolve('.env')
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger3);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }))
  await app.listen(3000);
}
bootstrap();
