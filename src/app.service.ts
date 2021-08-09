import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import ResResult from './lib/resResult';
import sendMail, { MailDto } from './lib/sendMail';
dotenv.config();
@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    async sendQna({ email, title, content }: MailDto): Promise<ResResult> {
        const newTitle = '[문의] ' + title;
        const newContent =
            `<${email}> 님으로부터의 문의 내용입니다.` + '\n\n' + content;
        sendMail({
            email: process.env.MAIL_EMAIL,
            title: newTitle,
            content: newContent,
        });
        return {
            status: true,
            code: 201,
            data: {
                message: '문의 메일이 성공적으로 전송되었습니다.',
            },
        };
    }
}
