import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { Observable } from 'rxjs';

@Injectable()
export class HasUserId implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requset = context.switchToHttp().getRequest();
    const userId = requset.headers['user-id'];
    console.log(userId, 'userId');

    if (!userId || !isValidObjectId(userId)) {
      throw new BadRequestException('ivalid id');
    }

    requset.userId = userId;

    return true;
  }
}
