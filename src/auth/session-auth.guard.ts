import { CanActivate, ExecutionContext } from "@nestjs/common";
import { RedisService } from "@/redis/redis.service";

export class SessionAuthGuard implements CanActivate {
    constructor(private readonly redisService: RedisService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const sessionId = req.cookies.sessionId;

        if (!sessionId) return false;

        const sessionKey = `sess:${sessionId}`
        const sessionData = await this.redisService.getClient().get(sessionKey);

        if(!sessionData) return false;

        return true;
    }
}