import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import sendMail, { MailDto } from './lib/sendMail';
dotenv.config();
@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    sendQna({ email, title, content }: MailDto) {
        const newTitle = '[문의] ' + title;
        const newContent =
            `<${email}> 님으로부터의 문의 내용입니다.` + '\n\n' + content;
        sendMail({
            email: process.env.MAIL_EMAIL,
            title: newTitle,
            content: newContent,
        });
    }
}
