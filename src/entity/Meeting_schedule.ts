import Meeting from './Meeting';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';

@Entity({ name: 'meeting_schedule' })
export default class MeetingSchedule {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'start_date' })
    startDate!: Date;

    @Column({ name: 'end_date' })
    endDate!: Date;

    @OneToOne(() => Meeting, (meeting) => meeting.meetingSchedule)
    @JoinColumn({ name: 'meeting_id' })
    meeting!: Meeting;
}
