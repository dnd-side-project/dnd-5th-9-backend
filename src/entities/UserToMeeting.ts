import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from './BaseEntity';
import Meetings from './Meetings';
import User from './Users';

@Entity({ name: 'user_to_meeting' })
export default class UserToMeeting extends BaseEntity {
    @ManyToOne(() => User, (user) => user.userToMeetings)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Meetings, (meetings) => meetings.userToMeetings)
    @JoinColumn({ name: 'meeting_id' })
    meetings: Meetings;
}
