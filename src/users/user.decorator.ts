import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const requset = ctx.switchToHttp().getRequest();
    return requset.userId;
  },
);
