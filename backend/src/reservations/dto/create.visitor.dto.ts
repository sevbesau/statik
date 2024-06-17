import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateVisitorDto
  implements Omit<Prisma.VisitorCreateInput, 'reservation'>
{
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  subscription_nr: string;
}
