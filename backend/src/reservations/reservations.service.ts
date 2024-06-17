import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { CreateReservationDto } from './dto/create.reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(createReservationDto: CreateReservationDto) {
    const { visitors, ...reservation } = createReservationDto;
    const { id: createdId } = await this.prisma.reservation.create({
      data: {
        ...reservation,
        visitors: {
          create: visitors,
        },
      },
    });

    return this.findById(createdId);
  }

  async findAll() {
    return this.prisma.reservation.findMany({
      include: {
        visitors: true,
      },
    });
  }

  async findById(reservationId: number) {
    return this.prisma.reservation.findFirst({
      where: { id: reservationId },
      include: {
        visitors: true,
      },
    });
  }
}
