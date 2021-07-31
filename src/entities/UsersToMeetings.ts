import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from './BaseEntity';
import Meetings from './Meetings';
import Users from './Users';

@Entity({ name: 'user_to_meeting' })
export default class UserToMeeting extends BaseEntity {
    @ManyToOne(() => Users, (user) => user.userToMeetings)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @ManyToOne(() => Meetings, (meetings) => meetings.userToMeetings)
    @JoinColumn({ name: 'meeting_id' })
    meetings: Meetings;
}
