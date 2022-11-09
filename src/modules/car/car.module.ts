import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarModel } from 'src/models/car.model';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [
    SequelizeModule.forFeature([
      CarModel,
    ]),
    AuthModule,
  ],
  exports: [CarService]
})
export class CarModule {}
