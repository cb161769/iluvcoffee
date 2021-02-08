import { Coffee } from './coffee';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FlavorEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @ManyToMany(type => Coffee, (coffee)  => coffee.flavors)
    coffees:Coffee[];
}
