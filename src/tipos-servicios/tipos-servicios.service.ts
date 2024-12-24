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
    return this.tpsRepository.find({
      relations: ['servicio']
    });
  }

  findAllbyServicio(id: number) {
    return this.tpsRepository.find({
       where: {servicio: {id: id}}
    });
  }

  findOne(id: number) {
    return this.tpsRepository.findOne({where: {id: id}});
  }

  async update(id: number, updateTiposServicioDto: UpdateTiposServicioDto) {
    const tipo_servicio = await this.tpsRepository.findOne({
      where: { id },
    })

    if (!tipo_servicio) {
      throw new Error('Tipo Servicio no encontrado');
    }
    Object.assign(tipo_servicio, updateTiposServicioDto);

    return await this.tpsRepository.save(tipo_servicio);
  }

  remove(id: number) {
    return this.tpsRepository.delete(id);
  }
}
