import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCarTypeDto } from './dto/create-car-type.dto';
import { UpdateCarTypeDto } from './dto/update-car-type.dto';
import { CarTypeModel } from './entities/car-type.entity';

@Injectable()
export class CarTypeService {
  constructor(
    @InjectModel(CarTypeModel) private carTypeModel: typeof CarTypeModel
  ) {}

  async create(createCarTypeDto: CreateCarTypeDto) {
    return await this.carTypeModel.create(createCarTypeDto);
  }

  findAll() {
    return `This action returns all carType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carType`;
  }

  update(id: number, updateCarTypeDto: UpdateCarTypeDto) {
    return `This action updates a #${id} carType`;
  }

  remove(id: number) {
    return `This action removes a #${id} carType`;
  }
}
