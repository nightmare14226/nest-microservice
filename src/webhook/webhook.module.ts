import { Module } from '@nestjs/common';
import { PaymentService } from './webhook.service';
import { PaymentController } from './webhook.controller';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
