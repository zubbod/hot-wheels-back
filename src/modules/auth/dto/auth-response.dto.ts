import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'src/models/user.model';

export class AuthResponseDto {
  @ApiProperty({
    description: 'jwt auth token',
    example: 'eyJsInR5cCI6Ikp9.eyG4gRE2MjM5MDIyfQ.S36POk6yJV_ad5c',
  })
  public token: string;

  @ApiProperty({
    description: 'current logged user',
    example: JSON.stringify(UserModel),
  })
  public user: UserModel;
}
