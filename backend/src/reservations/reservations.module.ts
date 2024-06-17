import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { PrismaModule } from 'src/lib/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ReservationsService],
  exports: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
