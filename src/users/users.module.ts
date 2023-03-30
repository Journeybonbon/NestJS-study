import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { UsersController } from './users.controller';
import { UserRepository } from '../email/users.repository';
import { UsersService } from './users.service';

@Module({
    imports: [EmailModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
