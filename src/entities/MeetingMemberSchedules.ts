import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import BaseEntity from './BaseEntity';
import MeetingMember from './MeetingMembers';

@Entity({ name: 'meeting_member_schedules' })
export default class MeetingMemberSchedules extends BaseEntity {
    @Column({ name: 'start_date' })
    startDate!: number;

    @Column({ name: 'end_date' })
    endDate!: number;

    @ManyToOne(
        () => MeetingMember,
        (meetingMember) => meetingMember.meetingMemberSchedules,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'meeting_member_id' })
    meetingMember!: MeetingMember;
}
