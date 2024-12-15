import { Module } from '@nestjs/common';
import { DemandasService } from './demandas.service';
import { DemandasController } from './demandas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demanda } from './entities/demanda.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Demanda, Cliente])],
  controllers: [DemandasController],
  providers: [DemandasService],
})
export class DemandasModule {}
