import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/role/enum/role.enum';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class RolesGuard implements CanActivate {

  private roles: RoleEnum[] = [];
  private user: UserModel;

  constructor(
    private jwt: JwtService,
    private reflector: Reflector,
  ) {
  }

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('roles guard works');
    this.roles = this.reflector.get<RoleEnum[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const jwtToken = request.headers.authorization.split(' ')[1];
    this.user = this.jwt.verify(jwtToken);

    return this.matchRoles();
  }

  private matchRoles(): boolean {
    const userRoles = this.user?.roles;

    if (!userRoles || !userRoles.length) {
      return false;
    }

    return userRoles.every(userRole => this.roles.includes(userRole.value));
  }
}
