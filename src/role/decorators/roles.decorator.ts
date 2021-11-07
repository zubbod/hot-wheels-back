import {
  CustomDecorator,
  SetMetadata,
} from '@nestjs/common';
import { RoleEnum } from 'src/role/enum/role.enum';

export const Roles = (...roles: RoleEnum[]): CustomDecorator => SetMetadata('roles', roles);
