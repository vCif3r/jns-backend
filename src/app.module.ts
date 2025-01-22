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
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { ContactosModule } from './contactos/contactos.module';
import { PostsModule } from './posts/posts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthService } from './auth/auth.service';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { AreasModule } from './areas/areas.module';
import { ConfigModule } from '@nestjs/config';
import { SuscripcionesModule } from './suscripciones/suscripciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
    NotificacionesModule,
    ContactosModule,
    PostsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // El directorio donde se guardan las imágenes
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forFeature([User, Role]),
    AreasModule,
    SuscripcionesModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
