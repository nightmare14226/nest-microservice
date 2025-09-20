import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService) { }

    async createOrder(userId: number) {
        const cartItems = await this.prismaService.cartItem.findMany({
            where: { id: userId },
            include: { product: true }
        })

        if (cartItems.length === 0) {
            throw new Error("Cart is Empty")
        }

        const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const order = await this.prismaService.order.create({
            data: {
                userId,
                total,
                item: {
                    create: cartItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price
                    }))
                }
            },
            include: { item: true }
        })

        await this.prismaService.cartItem.deleteMany({ where: { userId } });
        return order;
    }

    async getOrders(userId: number) {
        return this.prismaService.order.findMany({
            where: { userId },
            include: { item: { include: { product: true } } }
        });
    }

    async getOrderById(userId: number, orderId: number) {
        return this.prismaService.order.findFirst({
            where: { id: orderId, userId },
            include: { item: { include: { product: true } } }
        })
    }
}
