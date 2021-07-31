import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import Meetings from './src/entities/Meetings';
import MeetingMembers from './src/entities/MeetingMembers';
import MeetingMemberSchedules from './src/entities/MeetingMemberSchedules';
import MeetingSchedules from './src/entities/MeetingSchedules';
import MeetingPlaces from './src/entities/MeetingPlaces';
import Stations from './src/entities/Stations';
import Users from './src/entities/Users';
import UsersToMeetings from './src/entities/UsersToMeetings';
dotenv.config();

const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        Meetings,
        MeetingMembers,
        MeetingMemberSchedules,
        MeetingSchedules,
        MeetingPlaces,
        Stations,
        Users,
        UsersToMeetings,
    ],
    migrations: [__dirname + '/src/migration/*.ts'],
    cli: { migrationsDir: 'src/migrations' },
    autoLoadEntities: true,
    charset: 'utf8mb4',
    synchronize: true,
    keepConnectionAlive: true,
};

export = config;
