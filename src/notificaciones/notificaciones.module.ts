import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificationsGateway } from './notificaciones.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion, User])],  // Importa las entidades necesarias
  providers: [NotificacionesService, NotificationsGateway],  // Registra el servicio y el gateway
  exports: [NotificacionesService,NotificationsGateway], 
})
export class NotificacionesModule {}
