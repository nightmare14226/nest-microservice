import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) { }

    @Post('register')
    async register(@Body() dto: CreateUserDto) {
        const user = await this.userService.createUser(dto);
        return {id: user.id, email: user.email, name: user.name}
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }
}
