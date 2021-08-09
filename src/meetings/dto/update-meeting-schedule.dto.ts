import { IsArray } from 'class-validator';
import MeetingSchedules from '../../entities/MeetingSchedules';

export class UpdateMeetingScheduleDto {
    @IsArray()
    schedules: MeetingSchedules[];
}
