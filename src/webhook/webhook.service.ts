import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
    async processEvent(event: any) {
        console.log("Webhook event received:", event);

        if (event.type === 'payment_intent.succeeded') {
            const payment = event.data.object;
            console.log('Payment succeeded for:', payment.amount);
            // TODO: update DB or notify user
        }
    }
}
