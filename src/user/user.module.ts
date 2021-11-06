import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/user/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([
      UserModel
    ])
  ]
})
export class UserModule { }
