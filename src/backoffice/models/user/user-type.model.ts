import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserType{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    use_type_name: string;
}