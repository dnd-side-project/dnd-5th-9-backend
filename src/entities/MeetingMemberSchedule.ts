import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import BaseEntity from './BaseEntity';
import MeetingMember from './MeetingMember';

@Entity({ name: 'meeting_member_schedule' })
export default class MeetingMemberSchedule extends BaseEntity {
    @Column({ name: 'start_date' })
    startDate!: Date;

    @Column({ name: 'end_date' })
    endDate!: Date;

    @ManyToOne(
        () => MeetingMember,
        (meetingMember) => meetingMember.meetingMemberSchedules,
        { onDelete: 'SET NULL' }
    )
    @JoinColumn({ name: 'meeting_member_id' })
    meetingMember!: MeetingMember;
}
