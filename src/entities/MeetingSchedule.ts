import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import BaseEntity from './BaseEntity';
import Meeting from './Meeting';

@Entity({ name: 'meeting_schedule' })
export default class MeetingSchedule extends BaseEntity {
    @Column({ name: 'start_date' })
    startDate!: Date;

    @Column({ name: 'end_date' })
    endDate!: Date;

    @OneToOne(() => Meeting, (meeting) => meeting.meetingSchedule)
    @JoinColumn({ name: 'meeting_id' })
    meeting!: Meeting;
}
