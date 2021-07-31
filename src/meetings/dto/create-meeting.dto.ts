import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMeetingDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '오구오구 6주차 모임',
        description: '제목',
    })
    public title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '오구오구 6주차 모임을 위한 온라인 모임을 정합니다! ',
        description: '설명',
    })
    public description: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        example: true,
        description: '장소추천기능 온/오프',
    })
    public placeYn: boolean;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 1253145,
        description: '시작날짜',
    })
    public startDate: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 1253145,
        description: '종료날짜',
    })
    public endDate: number;
}
