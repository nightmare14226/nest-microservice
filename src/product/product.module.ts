import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ProductResolver, ProductResolver],
  exports: [ProductService]
})
export class ProductModule {}
