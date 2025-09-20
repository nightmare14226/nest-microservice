import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2025-08-27.basil',
        });
    }

    async createPaymentIntent(amount: number, currency: string = 'usd') {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'], // can include others like 'us_bank_account'
        });
        return paymentIntent;
    }
}

