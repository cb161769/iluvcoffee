import { UpdateCoffeeDto } from './../entitys/coffees/dto/update-coffee.dto';
import { CreateCoffeeDto } from './../entitys/coffees/dto/create-coffee.dto';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CofeesServiceService } from 'src/cofees-service/cofees-service.service';

@Controller('coffees')
export class CoffeesController {
    /**
     *
     */
    constructor(private readonly coffeesService: CofeesServiceService) {
        
        
    }
    @Get()
    findAll(@Query() paginationQuery) {
        //const {limit,offset} = paginationQuery;
        //return `This action returns all coffees, limit ${limit}, offset ${offset}`;
        return this.coffeesService.findAll();
    }
    @Get(':id')
    findOne(@Param('id' ) id:string){
        return this.coffeesService.findOne(id);
    }
    @Post()
    create (@Body() body:CreateCoffeeDto){
        return this.coffeesService.create( body);
    }
    @Patch(':id')
    update(@Param('id') id:string, @Body() body:UpdateCoffeeDto){
        return this.coffeesService.update(id,body);
    }
    @Delete(':id')
    remove (@Param('id') id: string){
        return this.coffeesService.remove(id);
    }
    

}
