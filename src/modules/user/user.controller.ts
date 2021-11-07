import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RoleEnum } from 'src/core/enum/role.enum';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/modules/user/user.service';

@ApiTags('User Controller')
@Controller('users')
export class UserController {

  constructor(private userService: UserService) {
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: UserModel })
  @ApiBody({ type: UserDto })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('create')
  public create(@Body() userDto: UserDto): Promise<UserModel> {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  public getUsers(): Promise<Array<UserModel>> {
    return this.userService.getAllUsers();
  }
}
