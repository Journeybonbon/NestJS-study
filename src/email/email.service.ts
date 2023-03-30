import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/email/users.repository';
import { EmailApi } from "./email.api";

@Injectable()
export class EmailService {
    constructor(
        private emailApi: EmailApi,
        private userRepository: UserRepository
    ){
    }

    async sendMemberJoinVerification(emailAddress: string, signupVerifyToken: string) {
        const baseUrl = this.emailApi.getBaseUrl();

        const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

        const mailOptions = {
            to: emailAddress,
            subject: '가입 인증 메일',
            html: `가입확인 버튼을 누르시면 가입 인증이 완료됩니다.<br/>
                <form action="${url}" method="POST">
                    <button>가입확인</button>
                </form>
            `
        }

        return await this.emailApi.sendEmail(mailOptions);
    }
}
