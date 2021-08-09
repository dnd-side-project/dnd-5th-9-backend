import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import MeetingSchedules from '../../entities/MeetingSchedules';

export class UpdateMeetingScheduleDto {
    @ApiProperty({
        example: [
            { startDate: 12345, endDate: 12347 },
            { startDate: 12370, endDate: 12380 },
        ],
        description: '숫자로 나타낸 숫자 배열',
    })
    @IsArray()
    schedules: MeetingSchedules[];
}
