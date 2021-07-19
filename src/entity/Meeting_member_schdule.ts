import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'meeting_member_schdule' })
export default class MeetingMemberSchdule {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'meeting_member_id' })
    meetingMemberId!: number;

    @Column({ name: 'start_date' })
    startDate!: Date;

    @Column({ name: 'end_date' })
    endDate!: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
