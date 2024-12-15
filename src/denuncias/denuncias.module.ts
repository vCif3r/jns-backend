import { Module } from '@nestjs/common';
import { DenunciaService } from './denuncias.service';
import { DenunciaController } from './denuncias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Denuncia } from './entities/denuncia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Denuncia])],
  controllers: [DenunciaController],
  providers: [DenunciaService],
})
export class DenunciasModule {}
