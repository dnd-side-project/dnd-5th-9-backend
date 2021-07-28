import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import MeetingMember from './MeetingMember';
import Meeting from './Meeting';

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

    @ManyToMany(() => Meeting, (meeting) => meeting.users)
    @JoinTable({
        name: 'user_to_meeting',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'meeting_id',
            referencedColumnName: 'id',
        },
    })
    meetings: Meeting[] | undefined;
}
