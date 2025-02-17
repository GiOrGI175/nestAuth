import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Subscription = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const requset = ctx.switchToHttp().getRequest();
    return requset.subscription;
  },
);
