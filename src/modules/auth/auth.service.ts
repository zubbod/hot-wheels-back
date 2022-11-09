import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from 'src/modules/auth/dto/auth-response.dto';
import { UserAuthDto } from 'src/modules/auth/dto/user-auth.dto';
import { AuthException } from 'src/core/exceptions/auth.exception';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcryptjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject('USER')
    private user: BehaviorSubject<UserModel>,
  ) {
  }

  public async login(userDto: UserAuthDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(userDto);
    this.user.next(user);
    return this.generateToken(user);
  }

  public async registration(userDto: UserDto): Promise<AuthResponseDto> {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(`User with email ${ userDto.email } already exist`, HttpStatus.BAD_REQUEST);
    } else {
      const password = await bcrypt.hash(userDto.password, 5);
      const user = await this.userService.createUser({ ...userDto, password });
      return this.generateToken(user);
    }
  }

  private generateToken(user: UserModel): AuthResponseDto {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  public async validateUser(userDto: Partial<UserDto>): Promise<UserModel> {
    const user = await this.userService.getUserByEmail(userDto.email);
    const isEqualPasswords = await bcrypt.compare(userDto?.password, user.password);

    if (user && isEqualPasswords) {
      return user;
    }
    throw new AuthException();
  }
}
