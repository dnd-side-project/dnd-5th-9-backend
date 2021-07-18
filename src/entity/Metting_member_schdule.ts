import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class metting_member_schdule {
    @PrimaryColumn()
    id!: number;

    @Column({ name: 'metting_member_id' })
    mettingMemberId!: number;

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
