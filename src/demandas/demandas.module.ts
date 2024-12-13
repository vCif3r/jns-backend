import { Module } from '@nestjs/common';
import { DemandasService } from './demandas.service';
import { DemandasController } from './demandas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demanda } from './entities/demanda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Demanda])],
  controllers: [DemandasController],
  providers: [DemandasService],
})
export class DemandasModule {}
