import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'station' })
export default class Station {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 63, update: false })
    name!: string;

    @Column({ length: 15, update: false })
    line!: string;

    @Column({ type: 'float', update: false })
    lat!: number;

    @Column({ type: 'float', update: false })
    lng!: number;

    @CreateDateColumn({
        name: 'created_at',
    })
    public createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    public updatedAt: Date;
}
