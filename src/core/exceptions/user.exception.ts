import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionOptions } from './auth.exception';

export const DEFAULT_USER_NOT_EXIST_EXCEPTION_OPTIONS = {
  message: 'User not found',
  status: HttpStatus.NOT_FOUND,
};

export class UserNotExistException extends HttpException {
  constructor(
    options: ExceptionOptions = DEFAULT_USER_NOT_EXIST_EXCEPTION_OPTIONS
  ) {
    super(options, options.status);
  }
}
