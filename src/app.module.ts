import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { AuthModule } from './auth/auth.module';
import { AbogadosModule } from './abogados/abogados.module';
import { AdminsModule } from './admins/admins.module';
import { DemandasModule } from './demandas/demandas.module';
import { StatisticsModule } from './statistics/statistics.module';
import { DenunciasModule } from './denuncias/denuncias.module';


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
    ClientesModule,
    AuthModule,
    AbogadosModule,
    AdminsModule,
    DemandasModule,
    StatisticsModule,
    DenunciasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
