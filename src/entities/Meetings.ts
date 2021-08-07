import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from './BaseEntity';
import MeetingMembers from './MeetingMembers';
import MeetingSchedules from './MeetingSchedules';
import UsersToMeetings from './UsersToMeetings';

@Entity({ name: 'meetings' })
export default class Meetings extends BaseEntity {
    @Column()
    title!: string;

    @Column()
    param!: string;

    @Column()
    description!: string;

    @Column({ name: 'place_yn', type: 'boolean', default: true })
    placeYn!: boolean;

    @OneToOne(
        () => MeetingSchedules,
        (meetingSchedule) => meetingSchedule.meetings
    )
    meetingSchedule: MeetingSchedules | undefined;

    @OneToMany(() => MeetingMembers, (meetingMember) => meetingMember.meeting)
    meetingMembers: MeetingMembers[] | undefined;

    @OneToMany(() => UsersToMeetings, (userToMeeting) => userToMeeting.meetings)
    userToMeetings: UsersToMeetings[] | undefined;
}
