import { FlavorEntity } from './flavor.entity';
import { PrimaryColumn,PrimaryGeneratedColumn,Column,Entity, ManyToMany, JoinTable } from "typeorm";
@Entity()
export class Coffee{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    brand:string;
    @Column	({default:0})
    recommendations:number;
    @JoinTable()
    @ManyToMany(type => FlavorEntity,(flavor) => flavor.coffees, {cascade:true})
    flavors:FlavorEntity[];
}