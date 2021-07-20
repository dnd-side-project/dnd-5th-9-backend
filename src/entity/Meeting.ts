import MeetingSchdule from './Meeting_schdule';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

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

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
