import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RoleEnum } from 'src/core/enum/role.enum';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Auth } from 'src/core/utils/auth';
import { UserModel } from 'src/models/user.model';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { UserService } from 'src/modules/user/user.service';

@ApiTags('User Controller')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: UserModel })
  @ApiBody({ type: UserDto })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
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

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('current')
  public getUser(@Request() req: Request): Promise<UserModel> {
    const authHeader = req.headers['authorization'];
    const token = Auth.token(authHeader);
    return this.userService.getCurrentLoggedUser(token);
  }
}
