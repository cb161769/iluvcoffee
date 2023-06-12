import { Module } from '@nestjs/common';
import { CartController } from './controller/cart.controller';
import { CartService } from './service/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './model/cart.model';

@Module({
  imports:[TypeOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
