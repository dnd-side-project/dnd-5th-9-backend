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
import { UpdateMeetingScheduleDto } from './dto/update-meeting-schedule.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('meetings')
@Controller('meetings')
export class MeetingsController {
    constructor(private readonly meetingsService: MeetingsService) {}

    @ApiOperation({ summary: '미팅 생성' })
    @ApiBody({ type: CreateMeetingDto })
    @UseGuards(OptionalJwtAuthGuard)
    @Post()
    create(@Req() req, @Body() createMeetingDto: CreateMeetingDto) {
        return this.meetingsService.create(req.user.id, createMeetingDto);
    }

    @ApiOperation({ summary: '미팅 장소 추가' })
    @ApiBody({ type: CreateMeetingPlaceDto })
    @Post('place')
    createPlace(@Body() createMeetingPlaceDto: CreateMeetingPlaceDto) {
        return this.meetingsService.createPlace(createMeetingPlaceDto);
    }

    @ApiOperation({ summary: '미팅 멤버 추가' })
    @ApiBody({ type: CreateMeetingMemberDto })
    @UseGuards(OptionalJwtAuthGuard)
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
    @ApiOperation({ summary: '미팅 리스트 보기' })
    @UseGuards(JwtAuthGuard)
    @Get('list')
    getMeetings(@Req() req) {
        return this.meetingsService.getMeetings(req.user.id);
    }

    @ApiOperation({ summary: '아이디 또는 파라미터를 통한 미팅 정보 보기' })
    @Get(':meetingIdOrParam')
    getMeeting(@Param('meetingIdOrParam') meetingIdOrParam: string) {
        return this.meetingsService.getMeeting(meetingIdOrParam);
    }

    @ApiOperation({ summary: '미팅 스케줄 보기' })
    @Get(':meetingId/schedule')
    getSchedules(@Param('meetingId') meetingId: number) {
        return this.meetingsService.getSchedules(meetingId);
    }

    @ApiOperation({ summary: '미팅 내 멤버 목록 반환' })
    @Get(':meetingId/member')
    getMembers(@Param('meetingId') meetingId: number) {
        return this.meetingsService.getMembers(meetingId);
    }

    @ApiOperation({ summary: '미팅 장소 결과 반환' })
    @Get(':meetingId/place')
    getPlace(@Param('meetingId') meetingId: number) {
        return this.meetingsService.getPlace(meetingId);
    }

    @ApiOperation({ summary: '미팅 내 닉네임 중복 체크' })
    @Get(':meetingId/:nickname')
    checkOverlapNickname(
        @Param('meetingId') meetingId: number,
        @Param('nickname') nickname: string
    ) {
        return this.meetingsService.checkOverlapNickname(meetingId, nickname);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: '미팅 업데이트' })
    @ApiBody({ type: UpdateMeetingDto })
    @UseGuards(JwtAuthGuard)
    @Put(':meetingId')
    update(
        @Param('meetingId') meetingId: number,
        @Req() req,
        @Body() updateMeetingDto: UpdateMeetingDto
    ) {
        return this.meetingsService.update(
            meetingId,
            req.user.id,
            updateMeetingDto
        );
    }

    @ApiOperation({ summary: '미팅 스케줄 수정' })
    @ApiBody({ type: UpdateMeetingScheduleDto })
    @UseGuards(OptionalJwtAuthGuard)
    @Put('schedule/:memberId')
    updateSchedule(
        @Req() req,
        @Param('memberId') memberId: number,
        @Body() updateMeetingScheduleDto: UpdateMeetingScheduleDto
    ) {
        return this.meetingsService.updateSchedule(
            memberId,
            req.user.id,
            updateMeetingScheduleDto
        );
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: '미팅 멤버 삭제' })
    @UseGuards(JwtAuthGuard)
    @Delete(':meetingId/member/:memberId')
    removeMember(
        @Req() req,
        @Param('meetingId') meetingId: number,
        @Param('memberId') memberId: number
    ) {
        return this.meetingsService.removeMember(
            meetingId,
            req.user.id,
            memberId
        );
    }
}
