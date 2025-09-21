import { Injectable, UnauthorizedException, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type Response } from 'express';
import * as bcrypt from 'bcrypt';

import { UserService } from '@/user/user.service';
import { RedisService } from '@/redis/redis.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private redisService: RedisService
    ) { }

    async validateUser(email: string, pass: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) return null;
        const match = await bcrypt.compare(pass, user.password);
        if (match) {
            const { password, hashedRt, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any, @Res() res: Response) {
        const { id, email, role } = user;
        const saved = await this.storeSession(id, email, role, res);
        
        if(!saved) throw new Error("Bad Session.");
        return this.getTokens(id, email, role);
    }

    async getTokens(userId: number, email: string, role: string) {
        const payload = { email, sub: userId, role };
        const access_token = this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRES_IN });
        const refresh_token = this.jwtService.sign(payload, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN })
        await this.userService.setRefreshToken(userId, refresh_token);
        return { access_token, refresh_token };
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.userService.findById(userId);
        if (!user || !user.hashedRt) throw new UnauthorizedException();
        const match = await bcrypt.compare(refreshToken, user.hashedRt);
        if (!match) throw new UnauthorizedException();
        return this.getTokens(userId, user.email, user.role);
    }

    async storeSession(userId: number, email: string, role: string, @Res() res: Response) {
        const sessionId = this.redisService.generateSessionId();
        const sessionKey = `sess:${sessionId}`;
        const userInfo = { userId, email, role };
        const saved = await this.redisService.storeSessionId(sessionKey, userInfo);

        if(!saved) throw new Error("Bad Session.");

        res.cookie('sessionId', sessionId, { httpOnly: true, secure: true, maxAge: 3600 * 1000});
        return saved;
    }
}
