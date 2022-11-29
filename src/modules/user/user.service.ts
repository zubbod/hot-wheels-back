import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleEnum } from 'src/core/enum/role.enum';
import { RoleModel } from 'src/models/role.model';
import { RoleService } from 'src/modules/role/role.service';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    private roleService: RoleService
  ) {}

  async createUser(dto: UserDto): Promise<UserModel> {
    const user = await this.userModel.create(dto);
    const role = await this.roleService.getRole(RoleEnum.User);

    if (!role)
      throw { message: 'role not found', status: HttpStatus.NOT_FOUND };
    await user.$set('roles', [role.id]);

    user.roles = [role];
    return user;
  }

  async getAllUsers(): Promise<Array<UserModel>> {
    const users = await this.userModel.findAll({ include: RoleModel });
    return users;
  }

  public async getUserByEmail(email: string): Promise<UserModel | undefined> {
    const user = this.userModel.findOne({
      where: { email },
      include: RoleModel,
    });
    return user;
  }
}
