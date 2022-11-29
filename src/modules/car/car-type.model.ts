import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CarModel } from 'src/models/car.model';
import { CarTypeModel } from '../car-type/entities/car-type.entity';

@Table({ tableName: 'car_types' })
export class CarTypesModel extends Model<CarTypesModel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => CarModel)
  @Column({ type: DataType.INTEGER })
  carId: number;

  @ForeignKey(() => CarTypeModel)
  @Column({ type: DataType.INTEGER })
  dictionaryId: number;
}
