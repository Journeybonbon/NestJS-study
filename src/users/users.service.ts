import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';
import { UserEntity } from './dto/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UsersService {

    constructor(
        private emailService: EmailService,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private authService: AuthService
    ) { }

    // 회원가입 로직
    async createUser(name: string, email: string, password: string) {
        await this.checkUserExists(email);

        const signupVerifyToken = uuid.v1();

        await this.saveUser(name, email, password, signupVerifyToken);
        await this.sendMemberJoinEmail(email, signupVerifyToken);

        
    }

    async verifyEmail(signupVerifyToken: string): Promise<string> {
        const user: any = await this.userRepository.findOne({
            where: {signupVerifyToken: signupVerifyToken}
        });
        if(user == null)
            throw new Error("해당 토큰을 가진 유저는 없습니다.");
        
        user.isDone = true;

        await this.userRepository.save(user);
        return this.authService.login({
            id: user.id,
            name: user.name,
            email: user.email
        });
    }
    
    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: {email: email}
        });

        if(user == null)
            throw new Error("로그인 실패 - 잘못된 이메일");

        if(user.isDone == false)
            throw new Error("로그인 실패 - 이메일 미인증");
            
        if(user.password != password)
            throw new Error("로그인 실패 - 잘못된 비밀번호");

        return user;
    }

    async getUserInfo(userId: number) {
        const user = await this.userRepository.findOne({
            where: {id: userId}
        });
        return user;
    }

    async checkUserExists(email: string) {
        const user = await this.userRepository.findOne({
            where: {email: email}
        });
        console.log(user);
        if(user != null)
            throw Error("이미 존재하는 유저 입니다.");
        return user;
    }

    private async saveUser(name: string, email: string, password: string, uniqueKey: string){
        const user = new UserEntity();
        user.name = name;
        user.email = email;
        user.password = password;
        user.signupVerifyToken = uniqueKey;
        user.isDone = false
        await this.userRepository.save(user);
    }

    private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }

}