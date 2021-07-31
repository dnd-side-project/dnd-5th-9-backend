import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckUserDto } from './dto/check-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import sendMail from '../lib/sendMail';
import User from '../entities/User';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    async check({ email }: CheckUserDto): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email } });
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
