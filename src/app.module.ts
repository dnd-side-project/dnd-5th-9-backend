import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MeetingsModule } from './meetings/meetings.module';
import * as ormconfig from '../ormconfig';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(ormconfig),
        UsersModule,
        MeetingsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
