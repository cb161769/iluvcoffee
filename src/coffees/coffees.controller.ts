import { ParseIntPipe } from './../common/pipes/parse-int.pipe';
import { UpdateCoffeeDto } from './../entitys/coffees/dto/update-coffee.dto';
import { CreateCoffeeDto } from './../entitys/coffees/dto/create-coffee.dto';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CofeesServiceService } from 'src/cofees-service/cofees-service.service';
import { Public } from 'src/entitys/decorators/decorator';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
    /**
     *
     */
    constructor(private readonly coffeesService: CofeesServiceService) {
        
        
    }
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Public()
    @Get()
    async findAll(@Query() paginationQuery) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        //const {limit,offset} = paginationQuery;
        //return `This action returns all coffees, limit ${limit}, offset ${offset}`;
        return this.coffeesService.findAll(paginationQuery);
    }
    @Get(':id')
    findOne(@Param('id',ParseIntPipe ) id:number){
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
