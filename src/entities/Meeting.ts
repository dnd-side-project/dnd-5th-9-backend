import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from './BaseEntity';
import MeetingMember from './MeetingMember';
import MeetingSchedule from './MeetingSchedule';
import UserToMeeting from './UserToMeeting';

@Entity({ name: 'meeting' })
export default class Meeting extends BaseEntity {
    @Column()
    title!: string;

    @Column()
    param!: string;

    @Column()
    description!: string;

    @Column({ name: 'place_yn', type: 'boolean', default: true })
    placeYn!: boolean;

    @OneToOne(
        () => MeetingSchedule,
        (meetingSchedule) => meetingSchedule.meeting
    )
    meetingSchedule: MeetingSchedule | undefined;

    @OneToMany(() => MeetingMember, (meetingMember) => meetingMember.meeting)
    meetingMembers: MeetingMember[] | undefined;

    @OneToMany(() => UserToMeeting, (userToMeeting) => userToMeeting.meeting)
    userToMeetings: UserToMeeting[] | undefined;
}
