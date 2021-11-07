import {
  ApiProperty,
} from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { CarTypeEmun } from 'src/core/enum/car-type.emun';
import { CarCreationAttr } from 'src/core/interfaces/car.interface';

@Table({ tableName: 'cars' })
export class CarModel extends Model<CarModel, CarCreationAttr> {

  @ApiProperty({ example: '1', description: 'id', required: true })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  public id: number;

  @ApiProperty({ example: 'Mercedes-Benz', description: 'car manufacturer' })
  @Column({ type: DataType.STRING, allowNull: true })
  public manufacturer: string;

  @ApiProperty({ example: 'AMG G63', description: 'car model' })
  @Column({ type: DataType.STRING, allowNull: true })
  public model: string;

  @ApiProperty({ example: '2009', description: 'cars create year' })
  @Column({ type: DataType.STRING, allowNull: true })
  public produceYear: string;

  @ApiProperty({ example: 'GFX53', description: 'car id', required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  public carId: string;

  @ApiProperty({ example: '1', description: 'user id', required: true })
  @Column({ type: DataType.INTEGER, allowNull: false })
  public userId: number;

  @ApiProperty({
    example: CarTypeEmun.AUTOMOBILE,
    enum: CarTypeEmun,
    examples: Object.values(CarTypeEmun),
    description: 'car type',
    required: true,
  })
  @Column({ type: DataType.ENUM, values: Object.values(CarTypeEmun), allowNull: false })
  public type: CarTypeEmun;
}
