import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import MeetingPlaces from '../entities/MeetingPlaces';
import MeetingMembers from '../entities/MeetingMembers';
import Meetings from '../entities/Meetings';
import MeetingSchedules from '../entities/MeetingSchedules';
import UsersToMeetings from '../entities/UsersToMeetings';
import Stations from '../entities/Stations';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MeetingMembers,
            MeetingPlaces,
            Meetings,
            MeetingSchedules,
            UsersToMeetings,
            Stations,
        ]),
    ],
    controllers: [MeetingsController],
    providers: [MeetingsService],
})
export class MeetingsModule {}
