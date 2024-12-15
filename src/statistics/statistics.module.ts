import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Abogado } from 'src/abogados/entities/abogado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Abogado])],
  providers: [StatisticsService],
  controllers: [StatisticsController]
})
export class StatisticsModule {}
