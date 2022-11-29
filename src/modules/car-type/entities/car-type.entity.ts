import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CarModel } from 'src/models/car.model';
import { CreateCarTypeDto } from '../dto/create-car-type.dto';

@Table({ tableName: 'cartype' })
export class CarTypeModel extends Model<CarTypeModel, CreateCarTypeDto> {
  @ApiProperty({ example: '1', description: 'type id', required: true })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  public id: number;

  @ApiProperty({ example: 'Name', description: 'name', required: true })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  public name: string;

  @HasMany(() => CarModel)
  public cars: CarModel[];
}
