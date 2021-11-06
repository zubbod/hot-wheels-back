import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleDto } from 'src/role/dto/role.dto';
import { RoleEnum } from 'src/role/enum/role.enum';
import { RoleModel } from 'src/role/role.model';

@Injectable()
export class RoleService {

  constructor(
    @InjectModel(RoleModel) private roleModel: typeof RoleModel,
  ) {
  }

  async createRole(dto: RoleDto): Promise<RoleModel> {
    const role = await this.roleModel.create(dto);
    return role;
  }

  async getRole(value: RoleEnum): Promise<RoleModel> {
    const role = await this.roleModel.findOne({ where: { value } });
    return role;
  }
}
