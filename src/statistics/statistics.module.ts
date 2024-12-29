import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Caso } from 'src/casos/entities/caso.entity';
import { Consulta } from 'src/consultas/entities/consulta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Caso, Consulta])],
  providers: [StatisticsService],
  controllers: [StatisticsController]
})
export class StatisticsModule {}
