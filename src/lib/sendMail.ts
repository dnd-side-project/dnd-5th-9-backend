// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
import * as dotenv from 'dotenv';
dotenv.config();

interface MailForm {
    email: string;
    title: string;
    content: string;
}

const sendMail = ({ email, title, content }: MailForm) => {
    console.log(`nodemailer: ${nodemailer}`);
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
