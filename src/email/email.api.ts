import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import {ConfigService} from '@nestjs/config'
import { Injectable } from "@nestjs/common";
interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}
@Injectable()
export class EmailApi {
    private sender: Mail;
    constructor(
        private configService: ConfigService
    ){
        this.sender = nodemailer.createTransport({
            service: this.configService.get("mail_service"),
            auth: {
                user: this.configService.get("mail_user"),
                pass: this.configService.get("password")
            }
        })
    }
    async sendEmail(mailOption: EmailOptions){
        return await this.sender.sendMail(mailOption);
    }

    getBaseUrl(){
        return this.configService.get("base_url")
    }
}