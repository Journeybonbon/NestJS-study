import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { EmailService } from './email/email.service';
import { UserRepository } from './users/users.repository';
import { EmailApi } from './email/email.api';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),],
  controllers: [UsersController],
  providers: [EmailApi, UsersService, EmailService, UserRepository],
})
// @Module({
//   controllers: [AppController],
//   providers: [AppService],
// })
export class AppModule {}
