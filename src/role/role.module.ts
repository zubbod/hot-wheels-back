import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from 'src/role/role.model';
import { UserRolesModel } from 'src/user/user-roles.model';
import { UserModel } from 'src/user/user.model';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
    SequelizeModule.forFeature([
      RoleModel,
      UserModel,
      UserRolesModel,
    ]),
  ],
  exports: [RoleService]
})
export class RoleModule {}
