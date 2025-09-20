import { Controller, Body, Post, Patch, Param, ParseIntPipe, Delete, Get, Req, UseGuards } from '@nestjs/common';
import { CreateCartDto } from './dto/create.cart.dto';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
    constructor(private cartService: CartService) { }

    @Post()
    addItem(@Body() cart: CreateCartDto) {
        return this.cartService.addItem(cart);
    }

    @Patch(':id')
    updateItem(@Param('id', ParseIntPipe) id: number, @Param('quantity', ParseIntPipe) quantity: number) {
        return this.cartService.updateItem(id, quantity);
    }

    @Delete(':id')
    deleteItem(@Param('id', ParseIntPipe) id: number) {
        return this.cartService.removeItem(id);
    }

    @Get()
    getItem(@Req() req) {
        const userId = req.user.id;
        return this.cartService.getCart(userId);
    }
}
