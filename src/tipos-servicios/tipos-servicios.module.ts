import { Module } from '@nestjs/common';
import { TiposServiciosService } from './tipos-servicios.service';
import { TiposServiciosController } from './tipos-servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposServicio } from './entities/tipos-servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TiposServicio])],
  controllers: [TiposServiciosController],
  providers: [TiposServiciosService,],
})
export class TiposServiciosModule {}
