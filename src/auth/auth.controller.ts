import { Controller, Body, Post, UseGuards, Request, Res } from '@nestjs/common';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import { UserService } from '@/user/user.service';
import { LocalAuthGuard } from './local-auth.guard';

import { CreateUserDto } from '@/user/dto/create.user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService, 
        private userService: UserService,
    ) { }

    @Post('register')
    async register(@Body() dto: CreateUserDto) {
        const user = await this.userService.createUser(dto);
        return {id: user.id, email: user.email, name: user.name}
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any, @Res() res: Response) {
        return this.authService.login(req.user, res);
    }
}
