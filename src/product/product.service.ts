import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { PrismaService } from '@/prisma/prisma.service';
import { RedisService } from '@/redis/redis.service';

import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';


@Injectable()
export class ProductService {
    private redis: Redis;
    constructor(
        private readonly prismaService: PrismaService,
        private readonly redisService: RedisService
    ) {
        this.redis = this.redisService.getClient();
    }

    async findAll() {
        const cacheKey = `product:category:all`;
        const cache = await this.redis.get(cacheKey);
        if(cache !== null) return JSON.parse(cache);

        const data =  this.prismaService.product.findMany();
        const saved = await this.redis.set(cacheKey, JSON.stringify(data), 'EX', 3600);
        if(saved !== 'OK') throw new Error('Caching Error.');
        return data;
    }

    async findOne(id: number) {
        const cacheKey = `product:category:id:${id}`;

        const cache = await this.redis.get(cacheKey);
        if(cache !== null) return JSON.parse(cache);

        const data =  this.prismaService.product.findUnique({ where: { id } });
        const saved = await this.redis.set(cacheKey, JSON.stringify(data), 'EX', 3600);
        if(saved !== 'OK') throw new Error('Caching Error.');
        return data;
    }

    create(data: CreateProductDto) {
        return this.prismaService.product.create({data});
    }

    update(id: number, data: UpdateProductDto) {
        return this.prismaService.product.update({ where: { id }, data });
    }

    remove(id: number) {
        return this.prismaService.product.delete({ where: { id } });
    }
}
