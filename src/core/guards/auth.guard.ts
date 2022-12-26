import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthException } from 'src/core/exceptions/auth.exception';
import { Auth } from 'src/core/utils/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private jwtService: JwtService) {}

  public canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // if (process.env.NODE_ENV === 'dev') return true;
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = Auth.bearer(authHeader);
      const token = Auth.token(authHeader);

      if (bearer !== 'Bearer' || !token) {
        throw new AuthException();
      }

      const user = this.jwtService.verify(token, { ignoreExpiration: false });
      req.user = user;
      return true;
    } catch (e) {
      throw new AuthException();
    }
  }
}
