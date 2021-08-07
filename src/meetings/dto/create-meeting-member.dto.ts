import { IsString } from 'class-validator';

export class CreateMeetingMemberDto {
    @IsString()
    nickname: string;
}
