import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMeetingPlaceDto } from './dto/create-meeting-place.dto';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import MeetingPlaces from '../entities/MeetingPlaces';
import MeetingMembers from '../entities/MeetingMembers';
import Meetings from '../entities/Meetings';
import MeetingSchedules from '../entities/MeetingSchedules';
import { uuid } from 'uuidv4';

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

    async checkOverlapName(meetingId: number, nickname: string) {
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

    update(id: number, updateMeetingDto: UpdateMeetingDto) {
        return `This action updates a #${id} meeting`;
    }

    remove(id: number) {
        return `This action removes a #${id} meeting`;
    }
}
