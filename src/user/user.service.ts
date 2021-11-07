import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleEnum } from 'src/role/enum/role.enum';
import { RoleModel } from 'src/role/role.model';
import { RoleService } from 'src/role/role.service';
import { UserDto } from 'src/user/dto/user.dto';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    private roleService: RoleService,
  ) {
  }

  async createUser(dto: UserDto): Promise<UserModel> {
    const user = await this.userModel.create(dto);
    const role = await this.roleService.getRole(RoleEnum.User);
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers(): Promise<Array<UserModel>> {
    const users = await this.userModel.findAll({ include: RoleModel });
    return users;
  }

  public async getUserByEmail(email: string): Promise<UserModel | undefined> {
    const user = this.userModel.findOne({ where: { email }, include: RoleModel });
    return user;
  }
}
