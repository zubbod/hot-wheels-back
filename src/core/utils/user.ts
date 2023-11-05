import { HttpStatus } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/models/user.model';
import { AuthException } from '../exceptions/auth.exception';

export const getUserId = (user: BehaviorSubject<UserModel>): number => {
  const userId = user.value?.getDataValue('id');
  if (!userId)
    throw new AuthException({
      status: HttpStatus.UNAUTHORIZED,
      message: 'User unauthorized or not exist',
    });
  return userId;
};
