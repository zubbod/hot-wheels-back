import { ApiProperty } from '@nestjs/swagger';
import { UserCreationAttr } from 'src/user/interfaces/user.interface';

export class UserDto implements UserCreationAttr {
  @ApiProperty({ example: 'example@mail.com', description: 'email', required: true })
  public email: string;

  @ApiProperty({ example: 'Ivanov', description: 'first name', required: true })
  public firstName: string;

  @ApiProperty({ example: 'Ivan', description: 'last name', required: true })
  public lastName: string;

  @ApiProperty({ example: '123456', description: 'password', required: true })
  public password: string;
}