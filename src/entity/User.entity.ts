import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class User {
    @PrimaryColumn()
    user_id!: string;

    @Column()
    password!: string;
}
