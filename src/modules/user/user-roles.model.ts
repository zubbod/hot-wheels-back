import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { RoleModel } from 'src/models/role.model';
import { UserModel } from 'src/models/user.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRolesModel extends Model<UserRolesModel> {

  @ApiProperty({ example: '1', description: 'id', required: true })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  public id: number;

  @ForeignKey(() => RoleModel)
  @ApiProperty({ example: '1', description: 'role id', required: true })
  @Column({ type: DataType.INTEGER })
  public roleId: number;

  @ForeignKey(() => UserModel)
  @ApiProperty({ example: '1', description: 'user id', required: true })
  @Column({ type: DataType.INTEGER })
  public userId: number;
}
