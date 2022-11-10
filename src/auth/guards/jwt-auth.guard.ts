import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthGuard } from "@nestjs/passport";

import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    if (err || !user) {

      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Usuario no autorizado',
      }, HttpStatus.UNAUTHORIZED);

    }

    return user;

  }
}
