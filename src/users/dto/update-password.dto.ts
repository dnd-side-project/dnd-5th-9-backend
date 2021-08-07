import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
    @ApiProperty({
        example: '',
        description: '해당하는 토큰 값',
    })
    @IsString()
    token: string;

    @ApiProperty({
        example: 'password',
        description: '비밀번호',
    })
    @IsString()
    password: string;
}
