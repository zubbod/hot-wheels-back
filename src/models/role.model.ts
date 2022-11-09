import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { RoleEnum } from 'src/core/enum/role.enum';
import { RoleCreationAttr } from 'src/core/interfaces/role.interface';
import { UserRolesModel } from 'src/modules/user/user-roles.model';
import { UserModel } from 'src/models/user.model';

@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel, RoleCreationAttr> {

  @ApiProperty({ example: '1', description: 'role id', required: true })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  public id: number;

  @ApiProperty({ enum: RoleEnum, example: RoleEnum.User, description: 'role', required: true })
  @Column({
    type: DataType.ENUM,
    values: Object.values(RoleEnum),
    allowNull: false,
    unique: true,
  })
  public value: RoleEnum;

  @ApiProperty({ example: 'simple user role', description: 'role description', required: true })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  public description: string;

  @BelongsToMany(() => UserModel, () => UserRolesModel)
  public users: UserModel[];
}
