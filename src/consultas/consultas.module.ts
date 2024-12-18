import { Module } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';

@Module({
  controllers: [ConsultasController],
  providers: [ConsultasService],
})
export class ConsultasModule {}
