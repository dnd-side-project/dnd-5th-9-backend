import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { uuid } from 'uuidv4';
import { CreateMeetingPlaceDto } from './dto/create-meeting-place.dto';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import MeetingPlaces from '../entities/MeetingPlaces';
import MeetingMembers from '../entities/MeetingMembers';
import Meetings from '../entities/Meetings';
import MeetingSchedules from '../entities/MeetingSchedules';
import Users from '../entities/Users';

@Injectable()
export class MeetingsService {
    constructor(
        @InjectRepository(MeetingPlaces)
        private meetingPlacesRepository: Repository<MeetingPlaces>,
        @InjectRepository(MeetingMembers)
        private meetingMembersRepository: Repository<MeetingMembers>,
        @InjectRepository(Meetings)
        private meetingsRepository: Repository<Meetings>
    ) {}

    async create(data: CreateMeetingDto) {
        let checkOverlap: number;
        let param = uuid();

        while (true) {
            checkOverlap = await this.meetingsRepository
                .createQueryBuilder()
                .select()
                .where('param=:param', { param: param })
                .getCount();

            if (checkOverlap == 0) break;

            param = uuid();
        }

        const meetingSchedules = new MeetingSchedules();
        meetingSchedules.startDate = new Date(data.startDate);
        meetingSchedules.endDate = new Date(data.endDate);

        // 가드 설정 안함. 회원 1번일때를 가정하고 제작
        const meetingMembers = new MeetingMembers();
        meetingMembers.id = 1;
        meetingMembers.auth = true;

        const meetings = new Meetings();
        meetings.title = data.title;
        meetings.description = data.description;
        meetings.placeYn = data.placeYn;
        meetings.param = param;

        try {
            const createMeeting = await this.meetingsRepository.save(meetings);
            if (createMeeting) {
                return {
                    result: true,
                    code: 200,
                    data: {
                        meetingInfo: createMeeting,
                        message: '모임을 생성했습니다. ',
                    },
                };
            }
        } catch (err) {
            throw err;
        }
    }

    async getMembers(meetingId: number): Promise<MeetingMembers[] | undefined> {
        try {
            const meeting = await this.meetingsRepository
                .createQueryBuilder('meetings')
                .where('meetings.id =:meetingId', { meetingId })
                .leftJoin('meetings.meetingMembers', 'member')
                .addSelect(['member.id', 'member.nickname', 'member.auth'])
                .getOne();
            if (!meeting) return undefined;
            return meeting.meetingMembers;
        } catch (err) {
            throw err;
        }
    }

    async checkOverlapNickname(meetingId: number, nickname: string) {
        const checkOverlap = await this.meetingMembersRepository
            .createQueryBuilder()
            .where('nickname=:nickname', { nickname: nickname })
            .andWhere('meeting_id=:meetingId', { meetingId: meetingId })
            .getCount();

        return {
            result: true,
            code: 200,
            data: {
                checkOverlap: checkOverlap,
            },
        };
    }

    async createPlace({
        memberId,
        lat,
        lng,
    }: CreateMeetingPlaceDto): Promise<number | undefined> {
        const meetingMember = await this.meetingMembersRepository.findOne(
            memberId
        );
        if (!meetingMember) return undefined;
        const result = await this.meetingPlacesRepository
            .createQueryBuilder()
            .insert()
            .into(MeetingPlaces)
            .values({ lat, lng, meetingMember })
            .execute();
        return result.raw.insertId;
    }

    findAll() {
        return `This action returns all meetings`;
    }

    findOne(id: number) {
        return `This action returns a #${id} meeting`;
    }

    async update(meetingsId: number, updateMeetingDto: UpdateMeetingDto) {
        const meetings = await this.meetingsRepository.findOne({
            where: { id: meetingsId },
        });

        if (!meetings) {
            throw new UnauthorizedException('미팅정보가 존재하지 않습니다.');
        }

        try {
            await this.meetingsRepository
                .createQueryBuilder('meetings')
                .update(Meetings)
                .set({
                    title: updateMeetingDto.title,
                    description: updateMeetingDto.description,
                })
                .where('id=:meetingsId', { meetingsId: 2 })
                .execute();

            return {
                result: true,
                code: 200,
                data: {
                    message: '모임을 수정했습니다. ',
                },
            };
        } catch (err) {
            throw new BadRequestException({
                message: '모임수정 중 오류가 발생했습니다.',
            });
        }
    }

    remove(id: number) {
        return `This action removes a #${id} meeting`;
    }

    async isAuth(user: Users, meetingId: number) {
        try {
            const member = await this.meetingMembersRepository
                .createQueryBuilder()
                .where('id =:meetingId', { meetingId })
                .andWhere('user_id =:userId', { userId: user.id })
                .getOne();
            return member.auth;
        } catch (err) {
            throw err;
        }
    }

    async removeMember(memberId: number) {
        try {
            this.meetingMembersRepository
                .createQueryBuilder()
                .where('id=:memberId', { memberId })
                .delete()
                .execute();
        } catch (err) {
            throw err;
        }
    }
}
