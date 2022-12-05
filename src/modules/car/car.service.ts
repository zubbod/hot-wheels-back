import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BehaviorSubject } from 'rxjs';
import { AuthException } from 'src/core/exceptions/auth.exception';
import { PaginatorOptionsInterface } from 'src/core/interfaces/paginator-options.interface';
import { CarModel } from 'src/models/car.model';
import { FileModel } from 'src/models/file.model';
import { UserModel } from 'src/models/user.model';
import { CarDto } from 'src/modules/car/dto/car.dto';
import { CarsResponseDto } from 'src/modules/car/dto/cars-response.dto';
import { USER } from '../../core/token/user.token';
import { CarTypeModel } from '../car-type/entities/car-type.entity';

@Injectable({ scope: Scope.REQUEST })
export class CarService {
  constructor(
    @InjectModel(CarModel) private carModel: typeof CarModel,
    @Inject(USER)
    private user: BehaviorSubject<UserModel>
  ) {}

  public async createCar(dto: CarDto): Promise<CarModel> {
    return await this.carModel.create(dto);
  }

  public async deleteCar(id: number): Promise<CarModel> {
    const car = await this.getCarById(id);

    if (!car) {
      this.throwExceptionIfCarNotFound(id);
    } else {
      await this.carModel.destroy({ where: { id, userId: this.getUserId() } });
    }
    return car;
  }

  public async getCarById(id: number): Promise<CarModel> {
    return await this.carModel.findOne({
      where: { id, userId: this.getUserId() },
      include: [
        {
          model: CarTypeModel,
          attributes: ['id', 'name'],
        },
        {
          model: FileModel,
          attributes: ['fileExt', 'fileId', 'id', 'originalName'],
        },
      ],
    });
  }

  public async paginate(
    options: PaginatorOptionsInterface
  ): Promise<CarsResponseDto> {
    const limit = options.limit;
    const offset = options.offset;
    const result = await this.carModel.findAndCountAll({
      where: { userId: this.getUserId() },
      include: [
        {
          model: CarTypeModel,
          attributes: ['id', 'name'],
        },
        {
          model: FileModel,
          attributes: ['fileExt', 'fileId', 'id', 'originalName'],
        },
      ],
      limit,
      offset,
    });
    return new CarsResponseDto(result.rows, result.count);
  }

  public async updateCar(id: number, newCar: CarDto): Promise<CarModel> {
    const oldCar = await this.getCarById(id);
    if (!oldCar) {
      this.throwExceptionIfCarNotFound(id);
    }
    await oldCar.update({ ...newCar });
    return await oldCar.save();
  }

  private throwExceptionIfCarNotFound(carId: number): void {
    throw new HttpException(
      `Could not find car with id ${carId}`,
      HttpStatus.NOT_FOUND
    );
  }

  private getUserId(): number {
    const userId = this.user.value?.getDataValue('id');
    if (!userId)
      throw new AuthException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'User unauthorized or not exist',
      });
    return userId;
  }
}
