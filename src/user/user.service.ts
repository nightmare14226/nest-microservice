import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    findById(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async createUser(user: CreateUserDto) {
        const hash = await bcrypt.hash(user.password, Number(process.env.BCRYPT_SALT_ROUNDS));
        return this.prisma.user.create({ data: { ...user, password: hash } });
    }

    async setRefreshToken(id: number, refreshToken: string) {
        const hashed = await bcrypt.hash(refreshToken, 10);
        return this.prisma.user.update({ where: { id }, data: { hashedRt: hashed } })
    }

    async removeRefreshToken(id: number) {
        return this.prisma.user.update({ where: { id }, data: { hashedRt: null } })
    }
}
