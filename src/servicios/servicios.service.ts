import { Injectable } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly serviciosRepository: Repository<Servicio>,
  ){}

  create(createServicioDto: CreateServicioDto) {
    const servicio = this.serviciosRepository.create(createServicioDto)
    return this.serviciosRepository.save(servicio);
  }

  findAll() {
    return this.serviciosRepository.find();
  }

  findOne(id: number) {
    return this.serviciosRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateServicioDto: UpdateServicioDto) {
    const servicio = await this.serviciosRepository.findOne({
      where: { id },
    });
    if (!servicio) {
      throw new Error('Servicio no encontrado');
    }

    // Actualizar las propiedades del servicio con el DTO
    Object.assign(servicio, updateServicioDto);

    // Guardar el servicio actualizado
    return await this.serviciosRepository.save(servicio);
  }

  remove(id: number) {
    return this.serviciosRepository.delete(id);
  }
}
