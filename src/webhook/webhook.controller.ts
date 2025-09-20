import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import { PaymentService } from './webhook.service';
import type { Request, Response } from 'express';

@Controller('webhook') // Endpoint: /webhook
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async handleWebhook(@Req() req: Request, @Res() res: Response, @Body() body: any) {
    try {
      // Pass the body to the service for processing
      await this.paymentService.processEvent(body);
      res.status(200).send('Received'); // Success response
    } catch (err) {
      console.error('Webhook processing error:', err);
      res.status(400).send('Error processing webhook');
    }
  }
}
