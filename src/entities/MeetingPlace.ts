import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import BaseEntity from './BaseEntity';
import MeetingMember from './MeetingMember';

@Entity({ name: 'meeting_place' })
export default class MeetingPlace extends BaseEntity {
    @Column({ type: 'float' })
    lat?: number;

    @Column({ type: 'float' })
    lng?: number;

    @OneToOne(
        () => MeetingMember,
        (meetingMember) => meetingMember.meetingPlace
    )
    @JoinColumn({ name: 'meeting_member_id' })
    meetingMember!: MeetingMember;
}
