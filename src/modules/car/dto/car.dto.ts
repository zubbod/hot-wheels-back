import { ApiProperty } from '@nestjs/swagger';
import { CarCreationAttr } from 'src/core/interfaces/car.interface';
import { CarTypeModel } from 'src/modules/car-type/entities/car-type.entity';

export class CarDto implements CarCreationAttr {
  @ApiProperty({
    name: 'carId',
    type: String,
    example: 'GFD54',
    required: true,
  })
  public carId: string;

  @ApiProperty({
    name: 'manufacturer',
    type: String,
    example: 'Mercedes-Benz',
    required: false,
  })
  public manufacturer: string;

  @ApiProperty({
    name: 'model',
    type: String,
    example: 'AMG G63',
    required: false,
  })
  public model: string;

  @ApiProperty({
    name: 'produceYear',
    type: String,
    example: '2012',
    required: false,
  })
  public produceYear: string;

  @ApiProperty({
    name: 'type',
    type: CarTypeModel,
    required: true,
  })
  public type: CarTypeModel;

  @ApiProperty({ name: 'userId', type: Number, example: '1', required: true })
  public userId: number;
}
