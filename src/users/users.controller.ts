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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckUserDto } from './dto/check-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/join')
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        return await this.usersService.login(loginDto);
    }

    @Delete('')
    async removeUser(@Body('id') id: number) {
        return await this.usersService.removeUser(id);
    }

    @Post('check')
    async checkUser(@Body() checkUserDto: CheckUserDto) {
        const result = await this.usersService.check(checkUserDto);
        if (!result) throw new NotFoundException();
    }

    @Put('password')
    async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
        const result = await this.usersService.updatePassword(
            updatePasswordDto
        );
        if (!result) throw new NotFoundException();
    }
}
