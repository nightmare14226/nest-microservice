import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService) { }

    @Post('create-order')
    async createOrder(@Body() body: { amount: number; currency?: string }) {
        const { amount, currency } = body;
        const paymentIntent = await this.stripeService.createPaymentIntent(amount, currency);
        return {
            clientSecret: paymentIntent.client_secret, // frontend uses this to confirm payment
        };
    }
}
