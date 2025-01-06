import { Module } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { User } from 'src/users/entities/user.entity';
import { NotificationsGateway } from 'src/notificaciones/notificaciones.gateway';
import { NotificacionesModule } from 'src/notificaciones/notificaciones.module';
import { Notificacion } from 'src/notificaciones/entities/notificacion.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Consulta, User, Notificacion]),
    NotificacionesModule,
  ],
  controllers: [ConsultasController],
  providers: [
    ConsultasService,
    NotificationsGateway
  ],
})
export class ConsultasModule {}
