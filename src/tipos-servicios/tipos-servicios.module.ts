import { Module } from '@nestjs/common';
import { TiposServiciosService } from './tipos-servicios.service';
import { TiposServiciosController } from './tipos-servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposServicio } from './entities/tipos-servicio.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([TiposServicio])],
  controllers: [TiposServiciosController],
  providers: [TiposServiciosService,AuthGuard],
})
export class TiposServiciosModule {}
