import { CarModel } from 'src/models/car.model';

export class CarsResponseDto {
  public cars: CarModel[];
  public count: number;

  constructor(cars: CarModel[], count: number) {
    this.count = count;
    this.cars = cars;
  }
}
