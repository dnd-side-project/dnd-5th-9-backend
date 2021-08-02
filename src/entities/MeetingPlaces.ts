import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import BaseEntity from './BaseEntity';
import MeetingMembers from './MeetingMembers';

@Entity({ name: 'meeting_places' })
export default class MeetingPlaces extends BaseEntity {
    @Column({ type: 'float' })
    latitude: number;

    @Column({ type: 'float' })
    longitude: number;

    @OneToOne(
        () => MeetingMembers,
        (meetingMember) => meetingMember.meetingPlace
    )
    @JoinColumn({ name: 'meeting_member_id' })
    meetingMember!: MeetingMembers;
}
