import { NestFactory } from '@nestjs/core';
import * as bodyparser from 'body-parser'

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/webhook', bodyparser.raw({type: 'application/json'}));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
