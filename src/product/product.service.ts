import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateProductDto } from './dto/create.product.dto';

@Injectable()
export class ProductService {
    constructor(private readonly PrismaService: PrismaService) { }

    findAll() {
        return this.PrismaService.product.findMany();
    }

    findOne(id: number) {
        return this.PrismaService.product.findUnique({ where: { id } });
    }

    create(data: CreateProductDto) {
        return this.PrismaService.product.create({data});
    }

    update(id: number, data: CreateProductDto) {
        return this.PrismaService.product.update({ where: { id }, data });
    }

    remove(id: number) {
        return this.PrismaService.product.delete({ where: { id } });
    }
}
