import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import BaseEntity from './BaseEntity';
import Meetings from './Meetings';

@Entity({ name: 'meeting_schedules' })
export default class MeetingSchedules extends BaseEntity {
    @Column({ name: 'start_date' })
    startDate!: number;

    @Column({ name: 'end_date' })
    endDate!: number;

    @OneToOne(() => Meetings, (meeting) => meeting.meetingSchedule)
    @JoinColumn({ name: 'meeting_id' })
    meeting!: Meetings;
}
