import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import Users from '../entities/Users';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        JwtModule.register({
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
