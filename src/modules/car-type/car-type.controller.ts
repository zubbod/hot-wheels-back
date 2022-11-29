import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RoleEnum } from 'src/core/enum/role.enum';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { CarTypeService } from './car-type.service';
import { CreateCarTypeDto } from './dto/create-car-type.dto';
import { UpdateCarTypeDto } from './dto/update-car-type.dto';
import { CarTypeModel } from './entities/car-type.entity';

@Controller('car-type')
export class CarTypeController {
  constructor(private readonly carTypeService: CarTypeService) {}

  @ApiOperation({ summary: 'Create car type' })
  @ApiResponse({ status: 201, type: CarTypeModel })
  @ApiBody({ type: CreateCarTypeDto })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCarTypeDto: CreateCarTypeDto) {
    return this.carTypeService.create(createCarTypeDto);
  }

  @Get()
  findAll() {
    return this.carTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarTypeDto: UpdateCarTypeDto) {
    return this.carTypeService.update(+id, updateCarTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carTypeService.remove(+id);
  }
}
