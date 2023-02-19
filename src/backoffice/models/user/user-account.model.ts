import { UserLog } from './user-log.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class UserAccount {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_type_id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    date_of_birth: Date;
    @Column()
    gender: string;
    @Column()
    is_active: boolean;
    @Column()
    contact_number: string;
    @OneToMany(type=> UserLog,account => account.user_account_id)
    logs: UserLog[] 

}