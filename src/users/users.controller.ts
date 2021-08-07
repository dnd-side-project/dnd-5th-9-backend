import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    Put,
    UseGuards,
    Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
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
    @Post('/join')
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @ApiOperation({ summary: '로그인' })
    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        return await this.usersService.login(loginDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: '회원탈퇴' })
    @UseGuards(JwtAuthGuard)
    @Delete('')
    async removeUser(@Req() req) {
        return await this.usersService.removeUser(req.user.id);
    }

    @ApiOperation({ summary: '' })
    @Post('check')
    async checkUser(@Body() checkUserDto: CheckUserDto) {
        const result = await this.usersService.check(checkUserDto);
        if (!result) throw new NotFoundException();
    }

    @ApiOperation({ summary: '' })
    @Put('password')
    async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
        const result = await this.usersService.updatePassword(
            updatePasswordDto
        );
        if (!result) throw new NotFoundException();
    }
}
