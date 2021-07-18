import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class User {
    @PrimaryColumn()
    id!: number;

    @Column({ length: 63 })
    email!: string;

    @Column({ length: 511 })
    password!: string;

    @Column({ length: 63 })
    name!: string;

    @Column({ length: 1023 })
    token!: string;

    @Column({
        name: 'created_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;
}
