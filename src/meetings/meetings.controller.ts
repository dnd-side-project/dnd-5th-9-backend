import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
} from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingPlaceDto } from './dto/create-meeting-place.dto';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Controller('meetings')
export class MeetingsController {
    constructor(private readonly meetingsService: MeetingsService) {}

    @Post()
    create(@Body() createMeetingDto: CreateMeetingDto) {
        return this.meetingsService.create(createMeetingDto);
    }

    @Post('place')
    createPlace(@Body() createMeetingPlaceDto: CreateMeetingPlaceDto) {
        return this.meetingsService.createPlace(createMeetingPlaceDto);
    }

    @Get('list')
    findMeetingsList() {
        return this.meetingsService.findMeetingsList();
    }

    @Get(':meetingId/member')
    async getMembers(@Param('meetingId') meetingId: number) {
        return this.meetingsService.getMembers(meetingId);
    }

    @Get(':meetingId/place')
    getPlace(@Param('meetingId') meetingId: number) {
        return this.meetingsService.getPlace(meetingId);
    }

    @Get('/:meetingId/:nickname')
    checkOverlapNickname(
        @Param('meetingId') meetingId: number,
        @Param('nickname') nickname: string
    ) {
        return this.meetingsService.checkOverlapNickname(meetingId, nickname);
    }

    @Put('/:meetingId')
    update(
        @Param('meetingId') meetingId: number,
        @Body() updateMeetingDto: UpdateMeetingDto
    ) {
        return this.meetingsService.update(meetingId, updateMeetingDto);
    }

    @Delete(':meetingId/member/:memberId')
    removeMember(
        @Param('meetingId') meetingId: number,
        @Param('memberId') memberId: number
    ) {
        this.meetingsService.removeMember(meetingId, memberId);
    }
}
