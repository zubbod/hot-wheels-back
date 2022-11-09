import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthResponseDto } from 'src/modules/auth/dto/auth-response.dto';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { UserAuthDto } from 'src/modules/auth/dto/user-auth.dto';

@ApiTags('Authorization Controller')
@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {
  }

  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: UserAuthDto })
  @ApiResponse({ status: HttpStatus.OK, type: AuthResponseDto })
  @HttpCode(200)
  @Post('login')
  public async login(@Body() dto: UserAuthDto): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: HttpStatus.OK, type: AuthResponseDto })
  @HttpCode(200)
  @Post('registration')
  public async registration(@Body() dto: UserDto): Promise<AuthResponseDto> {
    return this.authService.registration(dto);
  }
}
