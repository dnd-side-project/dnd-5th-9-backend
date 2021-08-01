import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMeetingPlaceDto } from './dto/create-meeting-place.dto';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import MeetingPlaces from '../entities/MeetingPlaces';
import MeetingMembers from '../entities/MeetingMembers';

@Injectable()
export class MeetingsService {
    constructor(
        @InjectRepository(MeetingPlaces)
        private meetingPlacesRepository: Repository<MeetingPlaces>,
        @InjectRepository(MeetingMembers)
        private meetingMembersRepository: Repository<MeetingMembers>
    ) {}

    create(createMeetingDto: CreateMeetingDto) {
        return 'This action adds a new meeting';
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
