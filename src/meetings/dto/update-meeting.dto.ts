import { PartialType } from '@nestjs/swagger';
import { CreateMeetingDto } from './create-meeting.dto';

export class UpdateMeetingDto extends PartialType(CreateMeetingDto) {}
