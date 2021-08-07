import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckUserDto {
    @ApiProperty({
        example: 'dnd5959@gmail.com',
        description: '이메일',
    })
    @IsString()
    email: string;
}
