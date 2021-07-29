import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Meeting from './Meeting';
import User from './User';

@Entity({ name: 'user_to_meeting' })
export default class UserToMeeting {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.userToMeetings)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Meeting, (meeting) => meeting.userToMeetings)
    @JoinColumn({ name: 'meeting_id' })
    meeting: Meeting;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
    })
    updatedAt: Date;
}
