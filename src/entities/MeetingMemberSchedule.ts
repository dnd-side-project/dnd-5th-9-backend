import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import MeetingMember from './MeetingMember';

@Entity({ name: 'meeting_member_schedule' })
export default class MeetingMemberSchedule {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'start_date' })
    startDate!: Date;

    @Column({ name: 'end_date' })
    endDate!: Date;

    @CreateDateColumn({
        name: 'created_at',
    })
    public createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    public updatedAt: Date;

    @ManyToOne(
        () => MeetingMember,
        (meetingMember) => meetingMember.meetingMemberSchedules,
        { onDelete: 'SET NULL' }
    )
    @JoinColumn({ name: 'meeting_member_id' })
    meetingMember!: MeetingMember;
}
