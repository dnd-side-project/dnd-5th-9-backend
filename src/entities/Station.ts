import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
