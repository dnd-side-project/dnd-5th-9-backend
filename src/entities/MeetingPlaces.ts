import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import BaseEntity from './BaseEntity';
import MeetingMembers from './MeetingMembers';

@Entity({ name: 'meeting_places' })
export default class MeetingPlaces extends BaseEntity {
    @Column({ type: 'float' })
    lat: number;

    @Column({ type: 'float' })
    lng: number;

    @OneToOne(
        () => MeetingMembers,
        (meetingMember) => meetingMember.meetingPlace
    )
    @JoinColumn({ name: 'meeting_member_id' })
    meetingMember!: MeetingMembers;
}
