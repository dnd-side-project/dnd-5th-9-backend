// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
import { IsString } from 'class-validator';
import * as dotenv from 'dotenv';
dotenv.config();

export class MailDto {
    @IsString()
    email: string;

    @IsString()
    title: string;

    @IsString()
    content: string;
}

const sendMail = ({ email, title, content }: MailDto) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: process.env.MAIL_EMAIL,
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: `'moida' <${process.env.email}>`,
        to: email,
        subject: title,
        text: content,
    };
    transporter.sendMail(mailOptions, (err) => {
        if (err) throw err;
    });
};

export default sendMail;
