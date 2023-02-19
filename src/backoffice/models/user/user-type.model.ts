import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./user-account.model";

@Entity()
export class UserType{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    use_type_name: string;
    @OneToMany(type=> UserAccount,account => account.user_type_id) 
    Users:UserAccount[];
}