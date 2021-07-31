import { IsNumber } from 'class-validator';

export class CreateMeetingPlaceDto {
    @IsNumber()
    memberId: number;

    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;
}
