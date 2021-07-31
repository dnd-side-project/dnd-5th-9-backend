import { Module } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';

@Module({
  controllers: [MeetingsController],
  providers: [MeetingsService]
})
export class MeetingsModule {}
