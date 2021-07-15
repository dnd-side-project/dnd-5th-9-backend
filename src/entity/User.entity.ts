import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class User {
    @PrimaryColumn()
    userId!: number;

    @Column()
    password!: string;
}
