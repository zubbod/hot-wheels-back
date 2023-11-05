import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarModel } from 'src/models/car.model';
import { CarTypeModel } from '../car-type/entities/car-type.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [DashboardService],
  controllers: [DashboardController],
  imports: [SequelizeModule.forFeature([CarModel, CarTypeModel]), AuthModule],
  exports: [DashboardService],
})
export class DashboardModule {}
