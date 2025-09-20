import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCartDto } from './dto/create.cart.dto';

@Injectable()
export class CartService {
    constructor(private prismaService: PrismaService) { }

    addItem(cart: CreateCartDto) {
        const { userId, productId, quantity } = cart;
        this.prismaService.cartItem.create({ data: { userId, productId, quantity } });
    }

    updateItem(cartItemId: number, quantity: number) {
        this.prismaService.cartItem.update({ where: { id: cartItemId }, data: { quantity } });
    }

    removeItem(cartItemId: number) {
        this.prismaService.cartItem.delete({ where: { id: cartItemId } });
    }

    async getCart(userId: number) {
        const carts = await this.prismaService.cartItem.findMany({ where: { userId } });
        return carts;
    }
}
