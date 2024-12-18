import { Module } from '@nestjs/common';
import { CasosService } from './casos.service';
import { CasosController } from './casos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caso } from './entities/caso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Caso])],
  controllers: [CasosController],
  providers: [CasosService],
})
export class CasosModule {}
