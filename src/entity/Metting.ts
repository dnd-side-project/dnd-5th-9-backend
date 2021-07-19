import MettingSchdule from './Metting_schdule';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'metting' })
export default class Metting {
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
