import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserService } from '@/user/user.service';

@Module({
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
