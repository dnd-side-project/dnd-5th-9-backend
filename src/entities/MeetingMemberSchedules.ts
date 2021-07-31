import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import BaseEntity from './BaseEntity';
import MeetingMember from './MeetingMembers';

@Entity({ name: 'meeting_member_schedules' })
export default class MeetingMemberSchedules extends BaseEntity {
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
