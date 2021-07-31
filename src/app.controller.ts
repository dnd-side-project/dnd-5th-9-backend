import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MailDto } from './lib/sendMail';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('qna')
    sendQna(@Body() mailDto: MailDto) {
        this.appService.sendQna(mailDto);
    }
}
