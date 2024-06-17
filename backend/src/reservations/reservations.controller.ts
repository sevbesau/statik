import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReservationDto } from './dto/create.reservation.dto';
import { ReservationsService } from './reservations.service';
import { CreateVisitorDto } from './dto/create.visitor.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  async getReservations() {
    return await this.reservationsService.findAll();
  }

  @Post()
  async createReservation(@Body() createReservationDto: CreateReservationDto) {
    return await this.reservationsService.createOne(createReservationDto);
  }

  @Post('/:id/visitor')
  async addVisitor(
    @Param('id') reservationId: number,
    @Body() createVisitorDto: CreateVisitorDto,
  ) {
    return await this.reservationsService.addVisitor(
      reservationId,
      createVisitorDto,
    );
  }
}
