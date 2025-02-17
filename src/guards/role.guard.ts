import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private JwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requset = context.switchToHttp().getRequest();
      const token = this.getTokenFromHeader(requset.headers);

      if (!token) throw new BadRequestException('token is not provide');

      const payLoad = await this.JwtService.verify(token);
      requset.role = payLoad.role;

      return true;
    } catch (e) {
      throw new UnauthorizedException('permition dined');
    }
  }

  getTokenFromHeader(headers) {
    const authorization = headers['authorization'];
    if (!authorization) return null;

    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
