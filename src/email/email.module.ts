import { Module } from '@nestjs/common';
import { EmailApi } from './email.api';
import { EmailService } from './email.service';
import { UserRepository } from './users.repository';

@Module({
    providers: [EmailService, EmailApi, UserRepository],
    exports: [EmailService, UserRepository]
})
export class EmailModule {}
