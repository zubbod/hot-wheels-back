import { CarTypeEmun } from 'src/core/enum/car-type.emun';

export interface CarCreationAttr {
  manufacturer: string;
  model: string;
  carId: string;
  produceYear: string;
  type: CarTypeEmun;
}

export interface CarCreationAttrWithUserId extends CarCreationAttr {
  userId: number;
}
