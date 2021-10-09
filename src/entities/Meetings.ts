import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from './BaseEntity';
import MeetingMembers from './MeetingMembers';
import MeetingSchedules from './MeetingSchedules';

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
        (meetingSchedule) => meetingSchedule.meeting
    )
    meetingSchedule: MeetingSchedules | undefined;

    @OneToMany(() => MeetingMembers, (meetingMember) => meetingMember.meeting)
    meetingMembers: MeetingMembers[] | undefined;
}
