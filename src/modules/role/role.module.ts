import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from 'src/models/role.model';
import { UserRolesModel } from 'src/modules/user/user-roles.model';
import { UserModel } from 'src/models/user.model';
import { RoleController } from 'src/modules/role/role.controller';
import { RoleService } from 'src/modules/role/role.service';

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
  exports: [RoleService],
})
export class RoleModule {}
