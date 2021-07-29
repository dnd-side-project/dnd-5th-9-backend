import { Entity, Column, OneToMany } from 'typeorm';
import BaseEntity from './BaseEntity';
import MeetingMember from './MeetingMember';
import UserToMeeting from './UserToMeeting';

@Entity({ name: 'user' })
export default class User extends BaseEntity {
    @Column({ length: 63 })
    email!: string;

    @Column({ length: 511 })
    password!: string;

    @Column({ length: 63 })
    name!: string;

    @Column({ length: 1023 })
    token!: string;

    @OneToMany(() => MeetingMember, (meetingMember) => meetingMember.user)
    meetingMembers: MeetingMember[] | undefined;

    @OneToMany(() => UserToMeeting, (userToMeeting) => userToMeeting.user)
    userToMeetings: UserToMeeting[] | undefined;
}
