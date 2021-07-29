import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import MeetingMember from './MeetingMember';
import MeetingSchedule from './MeetingSchedule';
import UserToMeeting from './UserToMeeting';

@Entity({ name: 'meeting' })
export default class Meeting {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    param!: string;

    @Column()
    description!: string;

    @Column({ name: 'place_yn', type: 'boolean', default: true })
    placeYn!: boolean;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

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
