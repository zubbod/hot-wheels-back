import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleDto } from 'src/modules/role/dto/role.dto';
import { RoleEnum } from 'src/core/enum/role.enum';
import { RoleModel } from 'src/models/role.model';
import { RoleService } from 'src/modules/role/role.service';

@ApiTags('Role Controller')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {
  }

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 201, type: RoleModel })
  @ApiBody({ type: RoleDto })
  @Post('create')
  public async createRole(@Body() dto: RoleDto): Promise<RoleModel> {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: 'Get role by RoleEnum' })
  @ApiParam({ name: 'value', enum: RoleEnum })
  @ApiResponse({ status: 200, type: RoleModel })
  @Get('/:value')
  public async getRole(@Param('value') value: RoleEnum): Promise<RoleModel> {
    return this.roleService.getRole(value);
  }
}
