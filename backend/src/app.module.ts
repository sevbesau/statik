import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { PrismaService } from './lib/prisma/prisma.service';
import { PrismaModule } from './lib/prisma/prisma.module';

@Module({
  imports: [ReservationsModule, PrismaModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
