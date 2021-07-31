import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CheckUserDto } from './dto/check-user.dto';
import { LoginDto } from './dto/login.dto';

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

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
