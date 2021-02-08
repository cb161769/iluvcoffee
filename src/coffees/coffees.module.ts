import { FlavorEntity } from './../entitys/flavor.entity';
import { Coffee } from './../entitys/coffee';
import { Module } from '@nestjs/common';
import { CofeesServiceService } from 'src/cofees-service/cofees-service.service';
import { CoffeesController } from './coffees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/entitys/events/entities/event.entity';

@Module({imports:[TypeOrmModule.forFeature([Coffee,FlavorEntity,EventEntity])],controllers:[CoffeesController], providers:[CofeesServiceService]
,exports:[CofeesServiceService]})
export class CoffeesModule {}
