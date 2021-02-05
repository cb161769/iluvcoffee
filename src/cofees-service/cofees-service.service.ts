import { Coffee } from './../entitys/coffee';
import { Injectable,NotFoundException  } from '@nestjs/common';
import { json } from 'express';

@Injectable()
export class CofeesServiceService {
    private coffees: Coffee[] = [
        {
            id:1,
            name:'Roast',
            brand:'Buddy',
            flavors: ['Chocolate','Vanilla']
        },
    ];

    findAll(){
        return JSON.stringify(this.coffees);
    }
    findOne(id:string){
        const coffees = this.coffees.find(item => item.id === parseInt(id));
        if (!coffees) {
            throw new NotFoundException(`Coffee #${id} not found`);
            
        }
        return JSON.stringify( coffees);
    }
    create(createCoffeeDto:any){
        return this.coffees.push(createCoffeeDto)
    }
    update(id:string,createCoffeeDto:any){
        const coffee = this.coffees.find(item => item.id === +id);
        if (coffee) {
            const {id,name,brand,flavors } = createCoffeeDto;
            coffee.brand = brand;
            coffee.flavors = flavors;
            coffee.name = name;
            return coffee;
        }
    }
    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if (coffeeIndex >= 0) {
          this.coffees.splice(coffeeIndex, 1);
        }
      }
}
