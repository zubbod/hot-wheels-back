import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RoleEnum } from 'src/core/enum/role.enum';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { CarModel } from 'src/models/car.model';
import { CarService } from 'src/modules/car/car.service';
import { CarDto } from 'src/modules/car/dto/car.dto';
import { CarsResponseDto } from 'src/modules/car/dto/cars-response.dto';

@ApiTags('Car Controller')
@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @ApiOperation({ summary: 'Create car' })
  @ApiResponse({ status: 201, type: CarModel })
  @ApiBody({ type: CarDto })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  public async createCar(@Body() dto: CarDto): Promise<CarModel> {
    return await this.carService.createCar(dto);
  }

  @ApiOperation({ summary: 'Find car by name' })
  @ApiResponse({ status: 200, type: [CarModel] })
  @ApiQuery({
    name: 'query',
    type: String,
    example: 'bmw',
    description: 'car name',
  })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('search')
  public async search(@Query('query') name: string): Promise<CarModel[]> {
    return await this.carService.searchByName(name);
  }

  @ApiOperation({ summary: 'Delete car' })
  @ApiResponse({ status: 200, type: CarModel })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  public async deleteCar(@Param('id') id: number): Promise<CarModel> {
    return await this.carService.deleteCar(id);
  }

  @ApiOperation({ summary: 'Patch car' })
  @ApiResponse({ status: 200, type: CarModel })
  @ApiBody({ type: CarDto })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  public async updateCar(@Param('id') id: number, @Body() dto: CarDto): Promise<CarModel> {
    return await this.carService.updateCar(id, dto);
  }

  @ApiOperation({ summary: 'Get car by carId' })
  @ApiResponse({ status: 200, type: CarModel })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  public async getCarById(@Param('id') id: number): Promise<CarModel> {
    return await this.carService.getCarById(id);
  }

  @ApiOperation({ summary: 'Get all cars' })
  @ApiResponse({ status: 200, type: CarsResponseDto })
  @ApiQuery({
    name: 'limit',
    type: Number,
    example: '10',
    description: 'limit rows',
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    example: '10',
    description: 'skip rows',
  })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  public async paginate(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<CarsResponseDto> {
    return await this.carService.paginate({
      limit: Number(limit),
      offset: Number(offset),
    });
  }
}
