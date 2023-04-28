import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/dto/user.entity';
import { LoggerMiddleware } from './logger.middleware';
import { Logger2Middleware } from './logger2.middleware';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true
  }),
  UsersModule,
  EmailModule,
  TypeOrmModule.forRoot({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "typeorm",
    entities: [UserEntity],
    synchronize: process.env.DATABASE_SYNCHRONIZE == 'true',
  })
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware, Logger2Middleware).forRoutes(UsersController);  
    // consumer.apply(LoggerMiddleware, Logger2Middleware).forRoutes('/users');    
  }
}
