import {
    Controller,
    Post,
    Body,
    Delete,
    Put,
    UseGuards,
    Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckUserDto } from './dto/check-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: '회원가입' })
    @ApiBody({ type: CreateUserDto })
    @Post('join')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @ApiOperation({ summary: '로그인' })
    @ApiBody({ type: LoginDto })
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.usersService.login(loginDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: '회원탈퇴' })
    @UseGuards(JwtAuthGuard)
    @Delete()
    removeUser(@Req() req) {
        return this.usersService.removeUser(req.user.id);
    }

    @ApiOperation({ summary: '비밀번호 재설정 메일 발송' })
    @ApiBody({ type: CheckUserDto })
    @Post('check')
    checkUser(@Body() checkUserDto: CheckUserDto) {
        return this.usersService.check(checkUserDto);
    }

    @ApiOperation({ summary: '비밀번호 변경' })
    @ApiBody({ type: UpdatePasswordDto })
    @Put('password')
    updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
        return this.usersService.updatePassword(updatePasswordDto);
    }
}
