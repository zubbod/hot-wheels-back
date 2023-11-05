import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RoleEnum } from 'src/core/enum/role.enum';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async getDoubles() {
    return {
      doubles: await this.dashboardService.getDoubles(),
    };
  }
}
