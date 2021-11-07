import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthException } from 'src/exceptions/auth.exception';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(
    private jwtService: JwtService,
  ) {
  }

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new AuthException();
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      throw new AuthException();
    }
  }

}
