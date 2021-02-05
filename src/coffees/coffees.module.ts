import { Module } from '@nestjs/common';
import { CofeesServiceService } from 'src/cofees-service/cofees-service.service';
import { CoffeesController } from './coffees.controller';

@Module({controllers:[CoffeesController], providers:[CofeesServiceService]})
export class CoffeesModule {}
