import { Module } from '@nestjs/common';
import { AbogadosService } from './abogados.service';
import { AbogadosController } from './abogados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abogado } from './entities/abogado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Abogado])],
  controllers: [AbogadosController],
  providers: [AbogadosService],
})
export class AbogadosModule {}
