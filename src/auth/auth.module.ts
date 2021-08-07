import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import Users from '../entities/Users';
import { AuthService } from './auth.service';
import { LocalSerializer } from './local.serializer';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ session: true }),
        TypeOrmModule.forFeature([Users]),
        JwtModule.register({
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            signOptions: {
                expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
            },
        }),
    ],
    providers: [AuthService, LocalStrategy, LocalSerializer, JwtStrategy],
})
export class AuthModule {}
