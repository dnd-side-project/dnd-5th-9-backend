import Metting from './Metting';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'metting_schdule' })
export default class MettingSchdule {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'metting_id' })
    mettingId!: number;

    @Column({ name: 'start_date' })
    startDate!: Date;

    @Column({ name: 'end_date' })
    endDate!: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
