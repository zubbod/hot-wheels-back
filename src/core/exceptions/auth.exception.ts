import { HttpStatus, UnauthorizedException } from '@nestjs/common';

export type ExceptionOptions = {
  message: string;
  status: HttpStatus;
};

export const DEFAULT_AUTH_EXCEPTION_OPTIONS = {
  message: 'Invalid password or email',
  status: HttpStatus.UNAUTHORIZED,
};

export class AuthException extends UnauthorizedException {
  constructor(options: ExceptionOptions = DEFAULT_AUTH_EXCEPTION_OPTIONS) {
    super(options);
  }
}
