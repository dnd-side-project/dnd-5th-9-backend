import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import MeetingMember from './MeetingMember';
import MeetingSchedule from './MeetingSchedule';
import User from './User';

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
    public createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    public updatedAt: Date;

    @OneToOne(
        () => MeetingSchedule,
        (meetingSchedule) => meetingSchedule.meeting
    )
    meetingSchedule: MeetingSchedule | undefined;

    @OneToMany(() => MeetingMember, (meetingMember) => meetingMember.meeting)
    meetingMembers: MeetingMember[] | undefined;

    @ManyToMany(() => User, (user) => user.meetings)
    users: User[] | undefined;
}
