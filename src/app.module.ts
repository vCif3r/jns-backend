import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { StatisticsModule } from './statistics/statistics.module';
import { ServiciosModule } from './servicios/servicios.module';
import { CasosModule } from './casos/casos.module';
import { ConsultasModule } from './consultas/consultas.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { TiposServiciosModule } from './tipos-servicios/tipos-servicios.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { ContactosModule } from './contactos/contactos.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'abogados_jns',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    StatisticsModule,
    ServiciosModule,
    CasosModule,
    ConsultasModule,
    UsersModule,
    RolesModule,
    TiposServiciosModule,
    NotificacionesModule,
    ContactosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
