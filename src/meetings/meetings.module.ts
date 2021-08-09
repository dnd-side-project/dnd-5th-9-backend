import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import MeetingPlaces from '../entities/MeetingPlaces';
import MeetingMembers from '../entities/MeetingMembers';
import Meetings from '../entities/Meetings';
import MeetingSchedules from '../entities/MeetingSchedules';
import MeetingMemberSchedules from '../entities/MeetingMemberSchedules';
import Users from '../entities/Users';
import UsersToMeetings from '../entities/UsersToMeetings';
import Stations from '../entities/Stations';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MeetingMembers,
            MeetingPlaces,
            Meetings,
            MeetingSchedules,
            MeetingMemberSchedules,
            Users,
            UsersToMeetings,
            Stations,
        ]),
    ],
    controllers: [MeetingsController],
    providers: [MeetingsService],
})
export class MeetingsModule {}
