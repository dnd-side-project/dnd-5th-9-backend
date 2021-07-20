import Meeting from './Meeting';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'meeting_schdule' })
export default class MeetingSchdule {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'meeting_id' })
    meetingId!: number;

    @Column({ name: 'start_date' })
    startDate!: Date;

    @Column({ name: 'end_date' })
    endDate!: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
