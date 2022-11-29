import { Module } from '@nestjs/common';
import { CarTypeService } from './car-type.service';
import { CarTypeController } from './car-type.controller';
import { CarTypeModel } from './entities/car-type.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarModel } from 'src/models/car.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CarTypeController],
  providers: [CarTypeService],
  imports: [SequelizeModule.forFeature([CarTypeModel, CarModel]), AuthModule],
})
export class CarTypeModule {}
