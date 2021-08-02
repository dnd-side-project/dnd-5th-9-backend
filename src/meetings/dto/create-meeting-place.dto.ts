import { IsNumber } from 'class-validator';

export class CreateMeetingPlaceDto {
    @IsNumber()
    memberId: number;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;
}
