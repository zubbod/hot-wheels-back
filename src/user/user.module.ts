import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from 'src/role/role.model';
import { RoleModule } from 'src/role/role.module';
import { UserRolesModel } from 'src/user/user-roles.model';
import { UserModel } from 'src/user/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([
      UserModel,
      RoleModel,
      UserRolesModel,
    ]),
    RoleModule,
  ],
  exports: [UserService],
})
export class UserModule {}
