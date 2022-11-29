import { ApiProperty } from '@nestjs/swagger';

export class CreateCarTypeDto {
  @ApiProperty({
    name: 'name',
    type: String,
    required: true,
    examples: ['automobile', 'suv'],
  })
  name: string;
}
