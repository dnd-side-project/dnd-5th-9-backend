import { Entity, Column, OneToMany } from 'typeorm';
import BaseEntity from './BaseEntity';
import MeetingMembers from './MeetingMembers';
import UsersToMeetings from './UsersToMeetings';

@Entity({ name: 'users' })
export default class Users extends BaseEntity {
    @Column({ length: 63 })
    email!: string;

    @Column({ length: 511 })
    password!: string;

    @Column({ length: 63 })
    name!: string;

    @Column({ length: 1023 })
    token!: string;

    @OneToMany(() => MeetingMembers, (meetingMember) => meetingMember.user)
    meetingMembers: MeetingMembers[] | undefined;

    @OneToMany(() => UsersToMeetings, (userToMeeting) => userToMeeting.user)
    userToMeetings: UsersToMeetings[] | undefined;
}
