import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMeetingDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '오구오구 6주차 모임 수정입니다. ',
        description: '제목',
    })
    public title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '오구오구 6주차 수정입니다. ',
        description: '설명',
    })
    public description: string;
}
