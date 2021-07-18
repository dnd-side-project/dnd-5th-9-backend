import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class metting_member {
    @PrimaryColumn()
    id!: number;

    @Column({ name: 'metting_id' })
    mettingId!: number;

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

    @Column({
        name: 'created_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;
}
