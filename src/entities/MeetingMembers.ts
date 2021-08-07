import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    OneToOne,
    Index,
} from 'typeorm';
import BaseEntity from './BaseEntity';
import Users from './Users';
import MeetingMemberSchedules from './MeetingMemberSchedules';
import Meetings from './Meetings';
import MeetingPlaces from './MeetingPlaces';

@Entity({ name: 'meeting_members' })
export default class MeetingMembers extends BaseEntity {
    @Column()
    @Index({ unique: true })
    nickname!: string;

    @Column()
    auth!: boolean;

    @OneToOne(() => MeetingPlaces, (meetingPlace) => meetingPlace.meetingMember)
    meetingPlace: MeetingPlaces | undefined;

    @OneToMany(
        () => MeetingMemberSchedules,
        (meetingMemberSchedule) => meetingMemberSchedule.meetingMember
    )
    meetingMemberSchedules: MeetingMemberSchedules[] | undefined;

    @ManyToOne(() => Meetings, (meeting) => meeting.meetingMembers)
    @JoinColumn({ name: 'meeting_id' })
    meeting!: Meetings;

    @ManyToOne(() => Users, (user) => user.meetingMembers, {
        onDelete: 'NO ACTION',
    })
    @JoinColumn({ name: 'user_id' })
    user!: Users;
}
