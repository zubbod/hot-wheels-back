import { Provider, Scope } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/models/user.model';

export const USER = 'USER';

export function userProvider(): Provider {
  return {
    provide: USER,
    useValue: new BehaviorSubject<UserModel>(undefined),
    scope: Scope.TRANSIENT,
  };
}
