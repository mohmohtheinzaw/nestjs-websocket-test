import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ResponserException } from '../filter/index';
import { verifyToken } from 'src/helper';

@Injectable()
export class UserAuthGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new ResponserException(
        { messageMm: 'Unauthorized', messageEn: 'Unauthorized' },
        401,
      );
    }
    try {
      const decoded = await verifyToken(token);
      request['user'] = decoded;
    } catch {
      throw new ResponserException(
        { messageMm: 'Unauthorized', messageEn: 'Unauthorized' },
        401,
      );
    }
    return true;
  }
  //
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
