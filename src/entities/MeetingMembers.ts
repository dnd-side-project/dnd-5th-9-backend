import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import BaseEntity from './BaseEntity';
import Users from './Users';
import MeetingMemberSchedules from './MeetingMemberSchedules';
import Meetings from './Meetings';
import MeetingPlaces from './MeetingPlaces';

@Entity({ name: 'meeting_members' })
export default class MeetingMembers extends BaseEntity {
    @Column()
    nickname!: string;

    @Column({ length: 511, nullable: true })
    password?: string;

    @Column()
    auth!: boolean;

    @OneToOne(() => MeetingPlaces, (meetingPlace) => meetingPlace.meetingMember)
    meetingPlace: MeetingPlaces | undefined;

    @OneToMany(
        () => MeetingMemberSchedules,
        (meetingMemberSchedule) => meetingMemberSchedule.meetingMember
    )
    meetingMemberSchedules: MeetingMemberSchedules[] | undefined;

    @ManyToOne(() => Meetings, (meetings) => meetings.meetingMembers)
    @JoinColumn({ name: 'meeting_id' })
    meetings!: Meetings;

    @ManyToOne(() => Users, (user) => user.meetingMembers)
    @JoinColumn({ name: 'user_id' })
    user!: Users;
}
