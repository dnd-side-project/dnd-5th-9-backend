import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { uuid } from 'uuidv4';
import * as geolib from 'geolib';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { CreateMeetingPlaceDto } from './dto/create-meeting-place.dto';
import { CreateMeetingMemberDto } from './dto/create-meeting-member.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { UpdateMeetingScheduleDto } from './dto/update-meeting-schedule.dto';
import MeetingPlaces from '../entities/MeetingPlaces';
import MeetingMembers from '../entities/MeetingMembers';
import Meetings from '../entities/Meetings';
import MeetingSchedules from '../entities/MeetingSchedules';
import MeetingMemberSchedules from '../entities/MeetingMemberSchedules';
import Users from '../entities/Users';
import UsersToMeetings from '../entities/UsersToMeetings';
import Stations from '../entities/Stations';
import ResResult from '../lib/resResult';

export interface Point {
    latitude: number;
    longitude: number;
}

@Injectable()
export class MeetingsService {
    constructor(
        private connection: Connection,
        @InjectRepository(MeetingPlaces)
        private meetingPlacesRepository: Repository<MeetingPlaces>,
        @InjectRepository(MeetingMembers)
        private meetingMembersRepository: Repository<MeetingMembers>,
        @InjectRepository(Meetings)
        private meetingsRepository: Repository<Meetings>,
        @InjectRepository(MeetingSchedules)
        private meetingSchedulesRepository: Repository<MeetingSchedules>,
        @InjectRepository(MeetingMemberSchedules)
        private meetingMemberSchedulesRepository: Repository<MeetingMemberSchedules>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(UsersToMeetings)
        private usersToMeetingsRepository: Repository<UsersToMeetings>,
        @InjectRepository(Stations)
        private stationsRepository: Repository<Stations>
    ) {}

    async create(userId: number, data: CreateMeetingDto): Promise<ResResult> {
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

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const meetings = new Meetings();
            meetings.title = data.title;
            meetings.description = data.description;
            meetings.placeYn = data.placeYn;
            meetings.param = param;

            const createMeeting = await this.meetingsRepository.save(meetings);

            const meetingMembers = new MeetingMembers();
            meetingMembers.nickname = data.nickname;
            meetingMembers.auth = true;

            const meetingSchedules = new MeetingSchedules();
            meetingSchedules.startDate = data.startDate;
            meetingSchedules.endDate = data.endDate;

            if (userId) {
                const users = new Users();
                const usersToMeetings = new UsersToMeetings();
                users.id = userId;
                meetingMembers.user = users;
                usersToMeetings.user = users;
                usersToMeetings.meeting = createMeeting;
                await this.usersToMeetingsRepository.save(usersToMeetings);
            }

            meetingMembers.meeting = createMeeting;
            meetingSchedules.meeting = createMeeting;

            await this.meetingMembersRepository.save(meetingMembers);
            await this.meetingSchedulesRepository.save(meetingSchedules);

            if (createMeeting) {
                await queryRunner.commitTransaction();
                return {
                    status: true,
                    code: 200,
                    data: {
                        meetingInfo: createMeeting,
                        message: '모임을 생성했습니다.',
                    },
                };
            }
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new BadRequestException({
                message: '모임생성 중 오류가 발생했습니다.',
            });
        } finally {
            await queryRunner.release();
        }
    }

    async createPlace({
        memberId,
        latitude,
        longitude,
    }: CreateMeetingPlaceDto): Promise<ResResult> {
        const meetingMember = await this.meetingMembersRepository.findOne(
            memberId
        );
        if (!meetingMember) throw new NotFoundException();
        try {
            const result = await this.meetingPlacesRepository
                .createQueryBuilder()
                .insert()
                .into(MeetingPlaces)
                .values({ latitude, longitude, meetingMember })
                .execute();
            return {
                status: true,
                code: 201,
                data: {
                    id: result.raw.insertId,
                },
            };
        } catch (err) {
            throw new BadRequestException({
                message: err,
            });
        }
    }

    async createMember(
        meetingId: number,
        userId: number,
        { nickname }: CreateMeetingMemberDto
    ): Promise<ResResult> {
        const result = await this.isExistNickname(meetingId, nickname);
        if (result)
            throw new BadRequestException('이미 존재하는 닉네임입니다.');

        const meeting = await this.meetingsRepository.findOne({
            id: meetingId,
        });
        if (!meeting) throw new NotFoundException();
        let user = null;
        if (userId) {
            user = await this.usersRepository.findOne({ id: userId });
        }
        try {
            const member = await this.meetingMembersRepository
                .createQueryBuilder()
                .insert()
                .into(MeetingMembers)
                .values({
                    nickname,
                    auth: false,
                    meeting,
                    user,
                })
                .execute();
            return {
                status: true,
                code: 201,
                data: {
                    id: member.raw.insertId,
                },
            };
        } catch (err) {
            throw new BadRequestException({
                message: err,
            });
        }
    }

    async getMeetings(userId: number): Promise<ResResult> {
        const meetings = await this.meetingMembersRepository
            .createQueryBuilder('meetingMembers')
            .innerJoin('meetingMembers.meeting', 'meeting')
            .innerJoin('meetingMembers.user', 'user')
            .where('user.id =:userId', { userId })
            .select([
                'meeting.id as id',
                'meeting.title as title',
                'meeting.param as param',
                'meeting.description as description',
                'meeting.placeYn as place_yn',
                'meeting.createdAt as created_at',
                'meetingMembers.auth as auth',
            ])
            .getRawMany();

        return {
            status: true,
            code: 200,
            data: {
                meetings,
            },
        };
    }

    async getMeeting(meetingIdOrParam: string): Promise<ResResult> {
        let meeting;
        if (!isNaN(+meetingIdOrParam)) {
            meeting = await this.meetingsRepository.findOne({
                where: { id: +meetingIdOrParam },
            });
        } else {
            meeting = await this.meetingsRepository.findOne({
                where: { param: meetingIdOrParam },
            });
        }
        if (!meeting)
            throw new NotFoundException('해당 미팅이 존재하지 않습니다.');
        return {
            status: true,
            code: 200,
            data: {
                meeting,
            },
        };
    }

    async getSchedules(meetingId: number) {
        const members = await this.meetingMembersRepository
            .createQueryBuilder('meetingMembers')
            .innerJoin('meetingMembers.meeting', 'meeting')
            .innerJoinAndSelect(
                'meetingMembers.meetingMemberSchedules',
                'meetingMemberSchedules'
            )
            .where('meeting.id =:meetingId', { meetingId })
            .getMany();
        return {
            status: true,
            code: 200,
            data: { members },
        };
    }

    async getMembers(meetingId: number): Promise<ResResult> {
        try {
            const meeting = await this.meetingsRepository
                .createQueryBuilder('meetings')
                .where('meetings.id =:meetingId', { meetingId })
                .leftJoin('meetings.meetingMembers', 'member')
                .addSelect(['member.id', 'member.nickname', 'member.auth'])
                .getOne();
            if (!meeting) throw new NotFoundException();
            return {
                status: true,
                code: 200,
                data: {
                    member: meeting.meetingMembers,
                },
            };
        } catch (err) {
            throw new BadRequestException({
                message: err,
            });
        }
    }

    async getPlace(meetingId: number): Promise<ResResult> {
        const center = await this.getCenter(meetingId);
        if (!center)
            return {
                status: true,
                code: 200,
                data: {
                    center: null,
                    stations: null,
                },
            };
        const stations = await this.getStations(center);
        return {
            status: true,
            code: 200,
            data: {
                center,
                stations,
            },
        };
    }

    async checkOverlapNickname(
        meetingId: number,
        nickname: string
    ): Promise<ResResult> {
        const checkOverlap = await this.isExistNickname(meetingId, nickname);
        return {
            status: true,
            code: 200,
            data: {
                checkOverlap: checkOverlap,
            },
        };
    }

    private async isExistNickname(meetingId: number, nickname: string) {
        const member = await this.meetingMembersRepository
            .createQueryBuilder()
            .where('nickname=:nickname', { nickname: nickname })
            .andWhere('meeting_id=:meetingId', { meetingId: meetingId })
            .getOne();
        if (member) return true;
        return false;
    }

    async update(
        meetingId: number,
        userId: number,
        updateMeetingDto: UpdateMeetingDto
    ): Promise<ResResult> {
        const isAuth = await this.isAuth(userId, meetingId);
        if (!isAuth) throw new UnauthorizedException('팀장이 아닙니다.');

        const meeting = await this.meetingsRepository.findOne({
            where: { id: meetingId },
        });
        if (!meeting)
            throw new UnauthorizedException('미팅정보가 존재하지 않습니다.');

        try {
            await this.meetingsRepository
                .createQueryBuilder('meetings')
                .update(Meetings)
                .set({
                    title: updateMeetingDto.title,
                    description: updateMeetingDto.description,
                })
                .where('id=:meetingId', { meetingId })
                .execute();

            return {
                status: true,
                code: 200,
                data: {
                    message: '모임을 수정했습니다. ',
                },
            };
        } catch (err) {
            throw new BadRequestException({
                message: '모임 수정 중 오류가 발생했습니다.',
            });
        }
    }

    async updateSchedule(
        memberId: number,
        userId: number,
        { schedules }: UpdateMeetingScheduleDto
    ): Promise<ResResult> {
        const member = await this.meetingMembersRepository.findOne({
            where: { id: memberId },
            relations: ['user'],
        });
        if (member.user && member.user.id !== userId)
            throw new UnauthorizedException();

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.meetingMemberSchedulesRepository
                .createQueryBuilder('meetingMemberSchedules')
                .innerJoin('meetingMemberSchedules.meetingMember', 'member')
                .where('member.id =:memberId', { memberId })
                .getMany()
                .then((schedules) =>
                    this.meetingMemberSchedulesRepository.remove(schedules)
                );
            schedules.forEach(async (schedule) => {
                await this.meetingSchedulesRepository
                    .createQueryBuilder()
                    .insert()
                    .into(MeetingMemberSchedules)
                    .values({
                        ...schedule,
                        meetingMember: member,
                    })
                    .execute();
            });
            queryRunner.commitTransaction();
        } catch (err) {
            queryRunner.rollbackTransaction();
            throw new BadRequestException({
                message: '모임 스케줄 등록 중 오류가 발생했습니다.',
            });
        } finally {
            queryRunner.release();
        }
        return {
            status: true,
            code: 200,
        };
    }

    async removeMember(
        meetingId: number,
        userId: number,
        memberId: number
    ): Promise<ResResult> {
        const isAuth = await this.isAuth(userId, meetingId);
        if (!isAuth) throw new UnauthorizedException('팀장이 아닙니다.');

        try {
            this.meetingMembersRepository.delete({ id: memberId });
            return {
                status: true,
                code: 200,
            };
        } catch (err) {
            throw new NotFoundException({ message: err });
        }
    }

    private async isAuth(userId: number, meetingId: number) {
        const user = await this.usersRepository.findOne({ id: userId });
        if (!user) throw new NotFoundException();

        try {
            const member = await this.meetingMembersRepository
                .createQueryBuilder()
                .where('id =:meetingId', { meetingId })
                .andWhere('user_id =:userId', { userId: user.id })
                .getOne();
            return member.auth;
        } catch (err) {
            throw new UnauthorizedException({ message: err });
        }
    }

    private async getCenter(meetingId: number): Promise<Point | false> {
        const points = await this.meetingPlacesRepository
            .createQueryBuilder('MeetingPlaces')
            .leftJoin('MeetingPlaces.meetingMember', 'meetingMember')
            .where('meetingMember.meeting_id =:meetingId', { meetingId })
            .select(['MeetingPlaces.latitude', 'MeetingPlaces.longitude'])
            .getMany();
        return geolib.getCenter(points);
    }

    private async getStations(center: Point) {
        const stations: Point[] = await this.stationsRepository
            .createQueryBuilder()
            .getMany();
        return geolib.orderByDistance(center, stations).slice(0, 5);
    }
}
