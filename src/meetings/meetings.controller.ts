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
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { CreateMeetingPlaceDto } from './dto/create-meeting-place.dto';
import { CreateMeetingMemberDto } from './dto/create-meeting-member.dto';
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

    @ApiOperation({ summary: '미팅멤버추가' })
    @UseGuards(JwtAuthGuard)
    @Post(':meetingId/member')
    createMember(
        @Req() req,
        @Param('meetingId') meetingId: number,
        @Body() createMeetingMemberDto: CreateMeetingMemberDto
    ) {
        return this.meetingsService.createMember(
            meetingId,
            req.user.id,
            createMeetingMemberDto
        );
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: '모임 리스트 보기' })
    @UseGuards(JwtAuthGuard)
    @Get('list')
    findMeetingsList(@Req() req) {
        return this.meetingsService.findMeetingsList(req.user.id);
    }

    @ApiOperation({ summary: '모임 스케줄 보기 ' })
    @Get(':meetingId/schedule')
    getSchedules(@Param('meetingId') meetingId: number) {
        return this.meetingsService.getSchedules(meetingId);
    }

    @ApiOperation({ summary: '' })
    @Get(':meetingId/member')
    getMembers(@Param('meetingId') meetingId: number) {
        return this.meetingsService.getMembers(meetingId);
    }

    @ApiOperation({ summary: '' })
    @Get(':meetingId/place')
    getPlace(@Param('meetingId') meetingId: number) {
        return this.meetingsService.getPlace(meetingId);
    }

    @ApiOperation({ summary: '미팅내 닉네임 중복 체크' })
    @Get(':meetingId/:nickname')
    checkOverlapNickname(
        @Param('meetingId') meetingId: number,
        @Param('nickname') nickname: string
    ) {
        return this.meetingsService.checkOverlapNickname(meetingId, nickname);
    }

    @ApiOperation({ summary: '' })
    @Put(':meetingId')
    update(
        @Param('meetingId') meetingId: number,
        @Body() updateMeetingDto: UpdateMeetingDto
    ) {
        return this.meetingsService.update(meetingId, updateMeetingDto);
    }

    @ApiOperation({ summary: '미팅 스케줄 수정' })
    @UseGuards(JwtAuthGuard)
    @Put('schedule/:memberId')
    updateSchedule(
        @Req() req,
        @Param('memberId') memberId: number,
        @Body() updateMeetingScheduleDto
    ) {
        return this.meetingsService.updateSchedule(
            memberId,
            req.user.id,
            updateMeetingScheduleDto
        );
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
