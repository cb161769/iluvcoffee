import { EventEntity } from 'src/entitys/events/entities/event.entity';
import { PaginationQueryDto } from './../entitys/common/dto/pagination-query.dto';
import { FlavorEntity } from './../entitys/flavor.entity';
import { UpdateCoffeeDto } from './../entitys/coffees/dto/update-coffee.dto';
import { CreateCoffeeDto } from './../entitys/coffees/dto/create-coffee.dto';
import { Coffee } from './../entitys/coffee';
import { Injectable,NotFoundException, Scope  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Console } from 'console';


@Injectable({scope: Scope.DEFAULT})
export class CofeesServiceService {
    /**
     *
     */
    
    constructor(
        @InjectRepository(Coffee) private readonly coffeRepository: Repository<Coffee>
        ,@InjectRepository(FlavorEntity) private readonly flavorRepository:Repository<FlavorEntity>,
        private readonly connection:Connection
     ) {
        //super();
           console.log('a')
    }
    

    findAll(paginationQuery:PaginationQueryDto){
        const {limit,offset} = paginationQuery;
       // return JSON.stringify(this.coffees);
       return this.coffeRepository.find({
           relations: ['flavors'],
           skip:offset,
           take:limit,
       });
    }
    async findOne(id:string){
        const coffee =  this.coffeRepository.findOne(id,{
            relations:['flavors']
        });
        if (!coffee) {
            throw new NotFoundException('not found');
            
        }
        return coffee;
    }
   async create(createCoffeeDto:CreateCoffeeDto){
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        );
        const Coffee = this .coffeRepository.create({
            ...createCoffeeDto,
            flavors,
        });
        return this.coffeRepository.save(Coffee);
        //return this.coffees.push(createCoffeeDto)
    }
    /**
     * 
     * @param id 
     * @param createCoffeeDto 
     */
    async update(id:string,updateCoffeeDto:UpdateCoffeeDto){
        const flavors =
        updateCoffeeDto.flavors &&
        (await Promise.all(
        updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        ));
        
        const coffee = await this.coffeRepository.preload({
            id: +id,
            ...UpdateCoffeeDto,
            flavors
        });
        if (!coffee) {
            throw new NotFoundException('not found');
        }
        return this.coffeRepository.save(coffee);
        
    }
    async remove(id: string) {
        const coffee = await this.coffeRepository.findOne(id);
        if (!coffee) {
            throw new NotFoundException('not found'); 
        }
        return this.coffeRepository.remove(coffee);
    }
    private async preloadFlavorByName (name:string) :Promise<FlavorEntity>{
        const existingFlavor = await this.flavorRepository.findOne({name});
        if (existingFlavor) {
            return existingFlavor;
            
        }
        return this.flavorRepository.create({name});
    }
    async recommendCoffee(coffee:Coffee){
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            coffee.recommendations ++;
            const recommendEvent = new EventEntity();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.Type = 'coffee';
            recommendEvent.payload = {coffeId:coffee.id};
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);
            await queryRunner.commitTransaction();
            
        } catch (error) {
            await queryRunner.rollbackTransaction();
            
        } finally{
            await queryRunner.release();
        }
    }
}
