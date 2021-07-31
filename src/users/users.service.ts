import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckUserDto } from './dto/check-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import sendMail from '../lib/sendMail';
import Users from '../entities/Users';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private jwtService: JwtService
    ) {}

    async getAccessToken(user: any) {
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        });
    }

    async create(data: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(data.password, 12);
        const email = await this.usersRepository.findOne({
            where: { email: data.email },
            withDeleted: true,
        });

        if (email) {
            throw new BadRequestException({
                message: '이미 사용중인 이메일 입니다.',
            });
        }

        const insertUser = new Users();
        insertUser.email = data.email;
        insertUser.password = hashedPassword;
        insertUser.name = data.name;

        const accessToken = await this.getAccessToken(insertUser);

        insertUser.token = accessToken;

        const join = await this.usersRepository.save(insertUser);

        return {
            result: true,
            code: 200,
            data: {
                idx: join.id,
                accessToken: accessToken,
                message: '성공적으로 가입 되었습니다.',
            },
        };
    }

    async login(data: LoginDto) {
        const user = await this.usersRepository.findOne({
            where: { email: data.email },
            select: ['id', 'email', 'name', 'password'],
        });

        if (!user) {
            throw new UnauthorizedException('회원정보가 존재하지 않습니다.');
        }

        const result = await bcrypt.compare(data.password, user.password);

        if (result) {
            const token = await this.getAccessToken(user);
            await this.usersRepository
                .createQueryBuilder('user')
                .update()
                .set({ token: token });

            user.token = token;

            const { password, ...userWithoutPassword } = user;
            return {
                result: true,
                code: 200,
                data: {
                    info: userWithoutPassword,
                    message: '로그인 성공했습니다.',
                },
            };
        } else {
            throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }
    }

    async removeUser(id: number) {
        const user = await this.usersRepository.findOne({
            where: { id: id },
        });

        if (!user) {
            throw new UnauthorizedException('회원정보가 존재하지 않습니다.');
        }

        await this.usersRepository.delete({ id: id });

        return {
            result: true,
            code: 200,
            data: {
                message: '정상적으로 탈퇴되었습니다. ',
            },
        };
    }

    async check({ email }: CheckUserDto): Promise<boolean> {
        const user = await this.usersRepository.findOne({ email });
        if (!user) return false;
        const title = '[moida] 비밀번호 변경 안내 메일';
        const content = `
        안녕하세요. 당신을 위한 모임 도우미, 𝗺𝗼𝗶𝗱𝗮입니다.
        해당 이메일로 moida 서비스의 비밀번호 변경이 요청되었습니다.
        
        본인의 요청이 맞다면, 하단의 링크를 통해 비밀번호를 변경해주시기 바랍니다.
        ${process.env.DOMAIN}/users/password?=token=${user.token}
        `;
        sendMail({
            email,
            title,
            content,
        });
        return true;
    }

    async updatePassword({
        token,
        password,
    }: UpdatePasswordDto): Promise<boolean> {
        const user = await this.usersRepository.findOne({ token });
        if (!user) return false;
        await this.usersRepository.update({ token }, { password });
        return true;
    }

    findAll() {
        return `This action returns all user`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
