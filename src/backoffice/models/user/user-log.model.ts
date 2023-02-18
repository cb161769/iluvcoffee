import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class UserLog {
    @PrimaryGeneratedColumn()
id: number;
@Column()
user_account_id: number;
@Column()
last_job_apply_date: Date;
}