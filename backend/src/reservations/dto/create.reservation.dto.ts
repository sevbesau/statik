import { ApiProperty } from '@nestjs/swagger';
import { CreateVisitorDto } from './create.visitor.dto';

export class CreateReservationDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  timeslot: Date;

  @ApiProperty()
  visitors?: CreateVisitorDto[];
}
