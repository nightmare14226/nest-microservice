import { Injectable, Res } from '@nestjs/common';
import { type Response } from 'express';
import Redis from 'ioredis';
import crypto from 'crypto';

@Injectable()
export class RedisService {
    private client: Redis;

    constructor() {
        this.client = new Redis({
            host: '127.0.0.1',
            port: 6379,
        })

        this.client.on('connect', () => console.log("Redis Connected"));
        this.client.on('error', err => console.error('Redis Error', err));
    }

    getClient(): Redis {
        return this.client;
    }

    generateSessionId() {
        return crypto.randomBytes(16).toString('hex');
    }

    async storeSessionId(sessionKey: string, user: any): Promise<boolean> {
        const saved = await this.client.set(sessionKey, JSON.stringify(user), 'EX', 3600);
        return saved === "OK";
    }
}
