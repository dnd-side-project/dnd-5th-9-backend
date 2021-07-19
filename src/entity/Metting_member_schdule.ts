import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'metting_member_schdule' })
export default class MettingMemberSchdule {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'metting_member_id' })
    mettingMemberId!: number;

    @Column({ name: 'start_date' })
    startDate!: Date;

    @Column({ name: 'end_date' })
    endDate!: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
