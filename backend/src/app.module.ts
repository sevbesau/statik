import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsModule } from './reservations/reservations.module';
import { PrismaService } from './lib/prisma/prisma.service';
import { PrismaModule } from './lib/prisma/prisma.module';

@Module({
  imports: [ReservationsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
