import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import Meeting from "./entities/Meeting";
import MeetingMember from "./entities/Meeting_member";
import MeetingMemberSchedule from "./entities/Meeting_member_schedule";
import MeetingSchedule from "./entities/Meeting_schedule";
import Station from "./entities/Station";
import User from "./entities/User";
dotenv.config();

const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Meeting, MeetingMember, MeetingMemberSchedule, MeetingSchedule, Station, User],
    migrations: [__dirname + '/src/migration/*.ts'],
    cli: { migrationsDir: 'src/migrations' },
    autoLoadEntities: true,
    charset: 'utf8mb4',
    synchronize: true,
    keepConnectionAlive: true,
};

export = config;