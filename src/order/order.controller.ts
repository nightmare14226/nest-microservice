import { Controller, Req, Post, Get, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { OrderService } from './order.service';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post('checkout')
    async createOrder(@Req() req) {
        return this.orderService.createOrder(req.user.id);
    }

    @Get()
    async getOrders(@Req() req) {
        return this.orderService.getOrders(req.user.id);
    }

    @Get(':id')
    async getOrderById(@Req() req, @Param('id', ParseIntPipe) orderId: number) {
        return this.orderService.getOrderById(req.user.id, orderId);
    }
}
