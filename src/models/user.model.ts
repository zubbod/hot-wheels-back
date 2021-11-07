import {
  ApiProperty,
} from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { RoleModel } from 'src/models/role.model';
import { UserCreationAttr } from 'src/core/interfaces/user.interface';
import { UserRolesModel } from 'src/modules/user/user-roles.model';

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttr> {

  @ApiProperty({ example: '1', description: 'id', required: true })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  public id: number;

  @ApiProperty({ example: 'example@mail.com', description: 'email', required: true })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  public email: string;

  @ApiProperty({ example: 'Ivanov', description: 'first name', required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  public firstName: string;

  @ApiProperty({ example: 'Ivan', description: 'last name', required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  public lastName: string;

  @ApiProperty({ example: '123456', description: 'password', required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  public password: string;

  @BelongsToMany(() => RoleModel, () => UserRolesModel)
  public roles: RoleModel[];
}
