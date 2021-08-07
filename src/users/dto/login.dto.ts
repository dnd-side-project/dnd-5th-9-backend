import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: 'devsh4030@gmail.com',
        description: '이메일',
    })
    public email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'test',
        description: '비밀번호',
    })
    public password: string;
}
