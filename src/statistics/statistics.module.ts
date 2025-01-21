import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Caso } from 'src/casos/entities/caso.entity';
import { Consulta } from 'src/consultas/entities/consulta.entity';
import { TiposServicio } from 'src/tipos-servicios/entities/tipos-servicio.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Caso, Consulta, Servicio, Role])],
  providers: [StatisticsService, AuthGuard],
  controllers: [StatisticsController]
})
export class StatisticsModule {}
