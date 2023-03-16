import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { EmailService } from './email/email.service';
import { UserRepository } from './users/users.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, EmailService, UserRepository],
})
// @Module({
//   controllers: [AppController],
//   providers: [AppService],
// })
export class AppModule {}
