import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMeetingMemberDto {
    @ApiProperty({
        example: '이현이현',
        description: '멤버의 닉네임',
    })
    @IsString()
    nickname: string;
}
