import { Entity, Column } from 'typeorm';
import BaseEntity from './BaseEntity';

@Entity({ name: 'stations' })
export default class Stations extends BaseEntity {
    @Column({ length: 63, update: false })
    name!: string;

    @Column({ length: 15, update: false })
    line!: string;

    @Column({ type: 'float', update: false })
    lat!: number;

    @Column({ type: 'float', update: false })
    lng!: number;
}
