import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler())
        if(!requiredPermissions) return true;
        const user = context.switchToHttp().getRequest().user;
        return requiredPermissions.includes(user.permission);
    }
}