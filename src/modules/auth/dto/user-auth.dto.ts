import { ApiProperty } from '@nestjs/swagger';

export class UserAuthDto {
  @ApiProperty({ example: 'example@mail.com', description: 'email', required: true })
  public email: string;

  @ApiProperty({ example: '123456', description: 'password', required: true })
  public password: string;
}
