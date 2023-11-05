import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { CarCreationAttr } from 'src/core/interfaces/car.interface';
import { CarTypeModel } from 'src/modules/car-type/entities/car-type.entity';
import { FileModel } from './file.model';

@Table({ tableName: 'cars' })
export class CarModel extends Model<CarModel, CarCreationAttr> {
  @ApiProperty({ example: '1', description: 'id', required: true })
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column(DataType.INTEGER)
  public id: number;

  @ApiProperty({ example: 'Mercedes-Benz', description: 'car manufacturer' })
  @Column(DataType.STRING)
  public manufacturer: string;

  @ApiProperty({ example: 'AMG G63', description: 'car model' })
  @Column(DataType.STRING)
  public model: string;

  @ApiProperty({ example: '2009', description: 'cars create year' })
  @Column(DataType.STRING)
  public produceYear: string;

  @ApiProperty({ example: 'GFX53', description: 'car code', required: true })
  @Column(DataType.STRING)
  public code: string;

  @ApiProperty({ example: '1', description: 'user id', required: true })
  @Column(DataType.INTEGER)
  public userId: number;

  @ForeignKey(() => CarTypeModel)
  @ApiProperty({
    description: 'car type',
    required: true,
  })
  @Column(DataType.INTEGER)
  typeId: number;

  @ForeignKey(() => FileModel)
  @ApiProperty({
    description: 'file id',
    required: true,
  })
  @Column(DataType.INTEGER)
  fileId: number;

  @BelongsTo(() => FileModel)
  file: FileModel;

  @BelongsTo(() => CarTypeModel)
  type: CarTypeModel;
}
