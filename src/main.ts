import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";
import * as path from "path"
import { ValidationPipe } from '@nestjs/common';
import { logger3 } from './logger/logger3.middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthGuard } from './auth/auth.guard';

dotenv.config({
  path: path.resolve('.env')
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger3);
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }))
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
