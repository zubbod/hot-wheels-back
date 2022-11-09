import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { FileCreationAttr } from 'src/core/interfaces/file.interface';

@Table({ tableName: 'files' })
export class FileModel extends Model<FileModel, FileCreationAttr> {

  @ApiProperty({ example: '1', description: 'id', required: true })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  public id: number;

  @ApiProperty({ example: 'b1c7426c-0748-4f34-99cc-8a6502f3bf8b', description: 'email', required: true })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  public fileId: string;

  @ApiProperty({ example: '.jpg', description: 'file extension', required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  public fileExt: string;

  @ApiProperty({ example: 'porshe.jpg', description: 'original name of image', required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  public originalName: string;

  @ApiProperty({ example: 123456, description: 'file size', required: true })
  @Column({ type: DataType.INTEGER, allowNull: false })
  public fileSize: number;
}
