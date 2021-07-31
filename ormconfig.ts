import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import Meeting from './src/entities/Meetings';
import MeetingMember from './src/entities/MeetingMember';
import MeetingMemberSchedule from './src/entities/MeetingMemberSchedule';
import MeetingSchedule from './src/entities/MeetingSchedule';
import MeetingPlace from './src/entities/MeetingPlace';
import Station from './src/entities/Station';
import User from './src/entities/Users';
import UserToMeeting from './src/entities/UserToMeeting';
dotenv.config();

const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        Meeting,
        MeetingMember,
        MeetingMemberSchedule,
        MeetingSchedule,
        MeetingPlace,
        Station,
        User,
        UserToMeeting,
    ],
    migrations: [__dirname + '/src/migration/*.ts'],
    cli: { migrationsDir: 'src/migrations' },
    autoLoadEntities: true,
    charset: 'utf8mb4',
    synchronize: true,
    keepConnectionAlive: true,
};

export = config;
