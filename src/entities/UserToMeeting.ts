import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from './BaseEntity';
import Meeting from './Meeting';
import User from './User';

@Entity({ name: 'user_to_meeting' })
export default class UserToMeeting extends BaseEntity {
    @ManyToOne(() => User, (user) => user.userToMeetings)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Meeting, (meeting) => meeting.userToMeetings)
    @JoinColumn({ name: 'meeting_id' })
    meeting: Meeting;
}
