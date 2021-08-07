import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    Req,
} from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingPlaceDto } from './dto/create-meeting-place.dto';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('meetings')
@Controller('meetings')
export class MeetingsController {
    constructor(private readonly meetingsService: MeetingsService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: '모임생성하기' })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req, @Body() createMeetingDto: CreateMeetingDto) {
        return this.meetingsService.create(req.user.id, createMeetingDto);
    }

    @ApiOperation({ summary: '' })
    @Post('place')
    createPlace(@Body() createMeetingPlaceDto: CreateMeetingPlaceDto) {
        return this.meetingsService.createPlace(createMeetingPlaceDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: '모임 리스트 보기' })
    @UseGuards(JwtAuthGuard)
    @Get('list')
    findMeetingsList(@Req() req) {
        return this.meetingsService.findMeetingsList(req.user.id);
    }

    @ApiOperation({ summary: '' })
    @Get(':meetingId/member')
    async getMembers(@Param('meetingId') meetingId: number) {
        return this.meetingsService.getMembers(meetingId);
    }

    @ApiOperation({ summary: '' })
    @Get(':meetingId/place')
    getPlace(@Param('meetingId') meetingId: number) {
        return this.meetingsService.getPlace(meetingId);
    }

    @ApiOperation({ summary: '미팅내 닉네임 중복 체크' })
    @Get('/:meetingId/:nickname')
    checkOverlapNickname(
        @Param('meetingId') meetingId: number,
        @Param('nickname') nickname: string
    ) {
        return this.meetingsService.checkOverlapNickname(meetingId, nickname);
    }

    @ApiOperation({ summary: '' })
    @Put('/:meetingId')
    update(
        @Param('meetingId') meetingId: number,
        @Body() updateMeetingDto: UpdateMeetingDto
    ) {
        return this.meetingsService.update(meetingId, updateMeetingDto);
    }

    @ApiOperation({ summary: '' })
    @Delete(':meetingId/member/:memberId')
    removeMember(
        @Param('meetingId') meetingId: number,
        @Param('memberId') memberId: number
    ) {
        return this.meetingsService.removeMember(meetingId, memberId);
    }
}
