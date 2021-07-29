import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import BaseEntity from './BaseEntity';
import User from './User';
import MeetingMemberSchedule from './MeetingMemberSchedule';
import Meeting from './Meeting';

@Entity({ name: 'meeting_member' })
export default class MeetingMember extends BaseEntity {
    @Column()
    nickname!: string;

    @Column({ length: 511, nullable: true })
    password?: string;

    @Column()
    auth!: boolean;

    @Column({ type: 'float' })
    lat?: number;

    @Column({ type: 'float' })
    lng?: number;

    @OneToMany(
        () => MeetingMemberSchedule,
        (meetingMemberSchedule) => meetingMemberSchedule.meetingMember
    )
    meetingMemberSchedules: MeetingMemberSchedule[] | undefined;

    @ManyToOne(() => Meeting, (meeting) => meeting.meetingMembers)
    @JoinColumn({ name: 'meeting_id' })
    meeting!: Meeting;

    @ManyToOne(() => User, (user) => user.meetingMembers)
    @JoinColumn({ name: 'user_id' })
    user!: User;
}
