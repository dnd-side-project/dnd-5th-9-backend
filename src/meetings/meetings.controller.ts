import { CreateMeetingPlaceDto } from './dto/create-meeting-place.dto';
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    NotFoundException,
    UnauthorizedException,
    Put,
    UseGuards,
    Req,
} from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import Users from '../entities/Users';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('meetings')
export class MeetingsController {
    constructor(private readonly meetingsService: MeetingsService) {}

    @UseGuards(OptionalJwtAuthGuard)
    @Post()
    create(@Req() req, @Body() createMeetingDto: CreateMeetingDto) {
        return this.meetingsService.create(req.user.id, createMeetingDto);
    }

    @Get('member/:meetingId')
    async getMembers(@Param('meetingId') meetingId: number) {
        const result = await this.meetingsService.getMembers(meetingId);
        if (!result) throw new NotFoundException();
        return result;
    }

    @Get('place/:meetingId')
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

    @Post('place')
    createPlace(@Body() createMeetingPlaceDto: CreateMeetingPlaceDto) {
        return this.meetingsService.createPlace(createMeetingPlaceDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('list')
    findMeetingsList(@Req() req) {
        return this.meetingsService.findMeetingsList(req.user.id);
    }

    @Put('/:meetingsId')
    update(
        @Param('meetingsId') meetingsId: number,
        @Body() updateMeetingDto: UpdateMeetingDto
    ) {
        return this.meetingsService.update(meetingsId, updateMeetingDto);
    }

    @Delete(':meetingId/member/:memberId')
    removeMember(
        @Param('meetingId') meetingId: number,
        @Param('memberId') memberId: number
    ) {
        const isAuth = this.meetingsService.isAuth(new Users(), meetingId); //TODO: 인가 기능 구현되면 실제 user 넣어야 함
        if (!isAuth) throw new UnauthorizedException();
        this.meetingsService.removeMember(memberId);
    }
}
