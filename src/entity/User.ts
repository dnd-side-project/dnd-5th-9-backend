import MeetingMember from './Meeting_member';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

    @OneToMany(() => MeetingMember, (meetingMember) => meetingMember.user)
    meetingMembers: MeetingMember[] | undefined;
}
