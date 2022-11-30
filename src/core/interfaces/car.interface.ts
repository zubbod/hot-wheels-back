import { CarTypeModel } from 'src/modules/car-type/entities/car-type.entity';

export interface CarCreationAttr {
  manufacturer: string;
  model: string;
  code: string;
  produceYear: string;
  type: CarTypeModel;
}

export interface CarCreationAttrWithUserId extends CarCreationAttr {
  userId: number;
}
