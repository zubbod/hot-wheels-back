import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { UserModel } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@ApiTags('User Controller')
@Controller('users')
export class UserController {

  constructor(private userService: UserService) {
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: UserModel })
  @ApiBody({ type: UserDto })
  @Post('create')
  public create(@Body() userDto: UserDto): Promise<UserModel> {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Get()
  public getUsers(): Promise<Array<UserModel>> {
    return this.userService.getAllUsers();
  }
}
