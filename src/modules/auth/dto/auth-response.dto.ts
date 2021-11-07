import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'jwt auth token',
    example: 'eyJsInR5cCI6Ikp9.eyG4gRE2MjM5MDIyfQ.S36POk6yJV_ad5c',
  })
  public token: string;
}
