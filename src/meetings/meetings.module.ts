import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import MeetingPlaces from '../entities/MeetingPlaces';
import MeetingMembers from '../entities/MeetingMembers';
import Meetings from '../entities/Meetings';

@Module({
    imports: [
        TypeOrmModule.forFeature([MeetingMembers, MeetingPlaces, Meetings]),
    ],
    controllers: [MeetingsController],
    providers: [MeetingsService],
})
export class MeetingsModule {}
