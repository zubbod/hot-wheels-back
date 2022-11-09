import {
  forwardRef,
  Module,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/modules/auth/auth.module';
import { RoleModel } from 'src/models/role.model';
import { RoleModule } from 'src/modules/role/role.module';
import { UserRolesModel } from 'src/modules/user/user-roles.model';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/modules/user/user.service';
import { UserController } from 'src/modules/user/user.controller';

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
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
