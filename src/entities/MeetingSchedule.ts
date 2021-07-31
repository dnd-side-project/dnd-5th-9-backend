import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import BaseEntity from './BaseEntity';
import Meetings from './Meetings';

@Entity({ name: 'meeting_schedule' })
export default class MeetingSchedule extends BaseEntity {
    @Column({ name: 'start_date' })
    startDate!: Date;

    @Column({ name: 'end_date' })
    endDate!: Date;

    @OneToOne(() => Meetings, (meetings) => meetings.meetingSchedule)
    @JoinColumn({ name: 'meeting_id' })
    meetings!: Meetings;
}
