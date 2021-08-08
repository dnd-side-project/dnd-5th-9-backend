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
import MeetingPlaces from '../entities/MeetingPlaces';
import MeetingMembers from '../entities/MeetingMembers';
import Meetings from '../entities/Meetings';
import MeetingSchedules from '../entities/MeetingSchedules';
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
            meetingSchedules.startDate = new Date(data.startDate);
            meetingSchedules.endDate = new Date(data.endDate);

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
                        message: '모임을 생성했습니다. ',
                    },
                };
            }
        } catch (err) {
            console.log(err);
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

    async findMeetingsList(userId: number): Promise<ResResult> {
        const list = await this.meetingsRepository
            .createQueryBuilder('meetings')
            .innerJoinAndSelect('meetings.userToMeetings', 'userToMeetings')
            .innerJoinAndSelect('userToMeetings.user', 'user')
            .innerJoinAndSelect('meetings.meetingMembers', 'meetingMembers')
            .where('user.id = :userId', { userId: userId })
            .select([
                'meetings.id as id',
                'meetings.title as title',
                'meetings.param as param',
                'meetings.description as description',
                'meetings.placeYn as place_yn',
                'date_format(userToMeetings.createdAt, "%Y-%m-%d %h:%i:%s") as created_at',
                'meetingMembers.auth as auth',
            ])
            .getRawMany();

        return {
            status: true,
            code: 200,
            data: {
                list: list,
            },
        };
    }

    async getSchedules(meetingId: number): Promise<ResResult> {
        const schedules = await this.meetingSchedulesRepository
            .createQueryBuilder('meetingSchedules')
            .leftJoin('meetingSchedules.meeting', 'meeting')
            .where('meeting.id =:meetingId', { meetingId })
            .getMany();
        return {
            status: true,
            code: 200,
            data: { schedules },
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
        const checkOverlap = await this.meetingMembersRepository
            .createQueryBuilder()
            .where('nickname=:nickname', { nickname: nickname })
            .andWhere('meeting_id=:meetingId', { meetingId: meetingId })
            .getCount();

        return {
            status: true,
            code: 200,
            data: {
                checkOverlap: checkOverlap,
            },
        };
    }

    // 유저 가드붙여서 유저 검증작업이 필요함.
    async update(
        meetingId: number,
        updateMeetingDto: UpdateMeetingDto
    ): Promise<ResResult> {
        const meeting = await this.meetingsRepository.findOne({
            where: { id: meetingId },
        });

        if (!meeting) {
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
                .where('id=:meetingId', { meetingId: 2 })
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
                message: '모임수정 중 오류가 발생했습니다.',
            });
        }
    }

    async removeMember(
        meetingId: number,
        memberId: number
    ): Promise<ResResult> {
        const isAuth = this.isAuth(new Users(), meetingId); //TODO: 인가 기능 구현되면 실제 user 넣어야 함
        if (!isAuth) throw new UnauthorizedException();
        try {
            this.meetingMembersRepository
                .createQueryBuilder()
                .where('id=:memberId', { memberId })
                .delete()
                .execute();
            return {
                status: true,
                code: 200,
            };
        } catch (err) {
            throw new NotFoundException({ message: err });
        }
    }

    private async isAuth(user: Users, meetingId: number) {
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
