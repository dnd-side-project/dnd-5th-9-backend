import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class Sample {
    @PrimaryColumn()
    user_id!: string;

    @Column()
    password!: string;
}
