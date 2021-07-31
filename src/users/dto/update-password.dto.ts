import { IsString } from 'class-validator';

export class UpdatePasswordDto {
    @IsString()
    token: string;

    @IsString()
    password: string;
}
