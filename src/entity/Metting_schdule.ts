import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class metting_schdule {
    @PrimaryColumn()
    id!: number;

    @Column({ name: 'metting_id' })
    mettingId!: number;

    @Column({ name: 'start_date' })
    startDate!: Date;

    @Column({ name: 'end_date' })
    endDate!: Date;

    @Column({
        name: 'created_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;
}
