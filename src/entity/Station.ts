import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class Station {
    @PrimaryColumn()
    id!: number;

    @Column({ length: 63 })
    name!: string;

    @Column({ length: 15 })
    line!: string;

    @Column({ type: 'float' })
    lat!: number;

    @Column({ type: 'float' })
    lng!: number;

    @Column({
        name: 'created_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;
}
