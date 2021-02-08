import { Type } from 'class-transformer';
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
@Index(["name", "Type"]) 
@Entity()
export class EventEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    Type:string;
    @Column()
    name:string;
   
    @Column('json')
    payload: Record<string,any>;
}
