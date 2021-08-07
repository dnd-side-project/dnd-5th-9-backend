import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetingPlaceDto {
    @ApiProperty({
        example: 1,
        description: '멤버의 아이디',
    })
    @IsNumber()
    memberId: number;

    @ApiProperty({
        example: 37.476954906501824,
        description: '위도',
    })
    @IsNumber()
    latitude: number;

    @ApiProperty({
        example: 126.96364089142745,
        description: '경도',
    })
    @IsNumber()
    longitude: number;
}
