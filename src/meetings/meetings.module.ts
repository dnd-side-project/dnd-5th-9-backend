import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import MeetingPlaces from '../entities/MeetingPlaces';
import MeetingMembers from '../entities/MeetingMembers';
import Meetings from '../entities/Meetings';
import MeetingSchedules from '../entities/MeetingSchedules';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MeetingMembers,
            MeetingPlaces,
            Meetings,
            MeetingSchedules,
        ]),
    ],
    controllers: [MeetingsController],
    providers: [MeetingsService],
})
export class MeetingsModule {}
