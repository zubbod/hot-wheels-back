import { ApiProperty } from '@nestjs/swagger';
import { RoleCreationAttr } from 'src/core/interfaces/role.interface';

export class RoleDto implements RoleCreationAttr {
  @ApiProperty({ example: 'USER', description: 'role', required: true })
  public value: string;

  @ApiProperty({ example: 'role for simple user', description: 'USER', required: true })
  public description: string;

}
