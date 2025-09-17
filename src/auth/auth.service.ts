import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

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

    async login(user: any) {
        const { id, email, role } = user;
        console.log((await this.getTokens(id, email, role)).access_token);
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
        if(!user || !user.hashedRt) throw new UnauthorizedException();
        const match = await bcrypt.compare(refreshToken, user.hashedRt);
        if(!match) throw new UnauthorizedException();
        return this.getTokens(userId, user.email, user.role);
    }
}
