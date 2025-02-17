import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Role = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const requset = ctx.switchToHttp().getRequest();
    return requset.role;
  },
);
