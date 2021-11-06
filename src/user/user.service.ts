import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from 'src/user/dto/user.dto';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
  ) {
  }

  async createUser(dto: UserDto): Promise<UserModel> {
    const user = await this.userModel.create(dto);
    return user;
  }

  async getAllUsers(): Promise<Array<UserModel>> {
    const users = await this.userModel.findAll();
    return users;
  }
}
