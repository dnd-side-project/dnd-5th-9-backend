import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import MeetingMember from './MeetingMember';
import UserToMeeting from './UserToMeeting';

@Entity({ name: 'user' })
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 63 })
    email!: string;

    @Column({ length: 511 })
    password!: string;

    @Column({ length: 63 })
    name!: string;

    @Column({ length: 1023 })
    token!: string;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

    @OneToMany(() => MeetingMember, (meetingMember) => meetingMember.user)
    meetingMembers: MeetingMember[] | undefined;

    @OneToMany(() => UserToMeeting, (userToMeeting) => userToMeeting.user)
    userToMeetings: UserToMeeting[] | undefined;
}
