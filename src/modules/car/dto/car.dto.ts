import { ApiProperty } from '@nestjs/swagger';
import { CarTypeEmun } from 'src/core/enum/car-type.emun';
import { CarCreationAttr } from 'src/core/interfaces/car.interface';

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
    type: CarTypeEmun,
    enum: CarTypeEmun,
    required: true,
    examples: Object.values(CarTypeEmun),
  })
  public type: CarTypeEmun;

  @ApiProperty({ name: 'userId', type: Number, example: '1', required: true })
  public userId: number;
}
