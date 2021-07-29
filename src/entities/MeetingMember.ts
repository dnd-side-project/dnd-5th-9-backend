import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import BaseEntity from './BaseEntity';
import User from './User';
import MeetingMemberSchedule from './MeetingMemberSchedule';
import Meeting from './Meeting';
import MeetingPlace from './MeetingPlace';

@Entity({ name: 'meeting_member' })
export default class MeetingMember extends BaseEntity {
    @Column()
    nickname!: string;

    @Column({ length: 511, nullable: true })
    password?: string;

    @Column()
    auth!: boolean;

    @OneToOne(() => MeetingPlace, (meetingPlace) => meetingPlace.meetingMember)
    meetingPlace: MeetingPlace | undefined;

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
