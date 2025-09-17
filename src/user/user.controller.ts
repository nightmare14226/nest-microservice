import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '@/auth/roles.deco';
import { RolesGuard } from '@/auth/roles.guard';

@Controller('user')
export class UserController {
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Post("dashboard")
    userDashboard() {
        return "You have right role!!!";
    }
}
