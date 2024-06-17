import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { CreateVisitorDto } from './dto/create.visitor.dto';
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

  async addVisitor(reservationId: number, createVisitorDto: CreateVisitorDto) {
    return this.prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        visitors: {
          create: createVisitorDto,
        },
      },
    });
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
