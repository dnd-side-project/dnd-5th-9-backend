import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import BaseEntity from './BaseEntity';
import User from './Users';
import MeetingMemberSchedule from './MeetingMemberSchedule';
import Meetings from './Meetings';
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

    @ManyToOne(() => Meetings, (meetings) => meetings.meetingMembers)
    @JoinColumn({ name: 'meeting_id' })
    meetings!: Meetings;

    @ManyToOne(() => User, (user) => user.meetingMembers)
    @JoinColumn({ name: 'user_id' })
    user!: User;
}
