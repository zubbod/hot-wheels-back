import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarModel } from 'src/models/car.model';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CarTypeModel } from '../car-type/entities/car-type.entity';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [SequelizeModule.forFeature([CarModel, CarTypeModel]), AuthModule],
  exports: [CarService],
})
export class CarModule {}
