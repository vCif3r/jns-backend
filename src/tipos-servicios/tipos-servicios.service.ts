import { Injectable } from '@nestjs/common';
import { CreateTiposServicioDto } from './dto/create-tipos-servicio.dto';
import { UpdateTiposServicioDto } from './dto/update-tipos-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TiposServicio } from './entities/tipos-servicio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposServiciosService {

  constructor(
    @InjectRepository(TiposServicio)
    private readonly tpsRepository: Repository<TiposServicio>,
  ){}

  create(createTiposServicioDto: CreateTiposServicioDto) {
    const tipo_servicio = this.tpsRepository.create(createTiposServicioDto)
    return this.tpsRepository.save(tipo_servicio);
  }

  findAll() {
    return `This action returns all tiposServicios`;
  }

  findAllbyServicio(id: number) {
    return this.tpsRepository.find({
       where: {servicio: {id: id}}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} tiposServicio`;
  }

  update(id: number, updateTiposServicioDto: UpdateTiposServicioDto) {
    return `This action updates a #${id} tiposServicio`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiposServicio`;
  }
}
