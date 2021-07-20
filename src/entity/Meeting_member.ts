import User from './User';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';

@Entity({ name: 'meeting_member' })
export default class MeetingMember {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'meeting_id' })
    meetingId!: number;

    @Column({ name: 'user_id' })
    userId!: number;

    @Column()
    name!: string;

    @Column({ length: 511, nullable: true })
    password?: string;

    @Column()
    auth!: boolean;

    @Column({ type: 'float' })
    lat?: number;

    @Column({ type: 'float' })
    lng?: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
