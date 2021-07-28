import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import Meeting from './src/entities/Meeting';
import MeetingMember from './src/entities/MeetingMember';
import MeetingMemberSchedule from './src/entities/MeetingMemberSchedule';
import MeetingSchedule from './src/entities/MeetingSchedule';
import Station from './src/entities/Station';
import User from './src/entities/User';
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
        Station,
        User,
    ],
    migrations: [__dirname + '/src/migration/*.ts'],
    cli: { migrationsDir: 'src/migrations' },
    autoLoadEntities: true,
    charset: 'utf8mb4',
    synchronize: true,
    keepConnectionAlive: true,
};

export = config;
