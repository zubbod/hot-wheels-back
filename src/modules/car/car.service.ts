import {
  HttpException,
  HttpStatus,
  Injectable,
  Scope,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { PaginatorOptionsInterface } from 'src/core/interfaces/paginator-options.interface';
import { Auth } from 'src/core/utils/auth';
import { CarModel } from 'src/models/car.model';
import { UserModel } from 'src/models/user.model';
import { CarDto } from 'src/modules/car/dto/car.dto';
import { CarsResponseDto } from 'src/modules/car/dto/cars-response.dto';

@Injectable({ scope: Scope.REQUEST })
export class CarService {
  constructor(
    @InjectModel(CarModel) private carModel: typeof CarModel,
    private jwtService: JwtService,
  ) {
  }

  public async createCar(dto: CarDto): Promise<CarModel> {
    return await this.carModel.create(dto);
  }

  public async deleteCar(id: number): Promise<CarModel> {
    const car = await this.getCarById(id);

    if (!car) {
      throw new HttpException(`Could not find car with id ${ id }`, HttpStatus.BAD_REQUEST);
    } else {
      await this.carModel.destroy({ where: { id } });
    }
    return car;
  }

  public async getCarById(id: number): Promise<CarModel> {
    return await this.carModel.findOne({ where: { id } });
  }

  public async paginate(authHeader: string, options: PaginatorOptionsInterface): Promise<CarsResponseDto> {
    const userId = this.getUserId(authHeader);
    const limit = options.limit;
    const offset = options.offset;
    const result = await this.carModel.findAndCountAll({ where: { userId }, limit, offset });
    return new CarsResponseDto(result.rows, result.count);
  }

  private getUserId(authHeader: string): number {
    const token = Auth.token(authHeader);
    const user: UserModel = this.jwtService.verify(token);
    return Number(user.id);
  }

}
