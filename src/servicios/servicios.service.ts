import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(createServicioDto: CreateServicioDto) {
    const existingServicio = await this.serviciosRepository.findOne({
      where: { nombre: createServicioDto.nombre }, 
    });

    if (existingServicio) {
      throw new ConflictException('El servicio con este nombre ya existe');
    }
    const servicio = this.serviciosRepository.create(createServicioDto);
    const servicioGuardado = await this.serviciosRepository.save(servicio);

    const servicioCreado = this.serviciosRepository.findOne({
      where: { id: servicioGuardado.id},
      relations: ['tipos_servicios'],
    })
    return servicioCreado;
  }

  findAll() {
    return this.serviciosRepository.find({
      relations: ['tipos_servicios'],
    });
  }

  findAllActives() {
    return this.serviciosRepository.createQueryBuilder('servicio')
      .leftJoinAndSelect('servicio.tipos_servicios', 'tipos_servicios')
      .where('servicio.disponible = :disponible', { disponible: true })
      .andWhere('tipos_servicios.id IS NOT NULL')  // Verifica que haya registros en la relación
      .getMany();
  }

  findServiciosPublicados(){
    return this.serviciosRepository.find({
      where: { publicado: true },
      relations: ['tipos_servicios']
    })
  }
  

  findAllWithTypes(id: number){
    return this.serviciosRepository.findOne({ 
      where: { id: id },
      relations: ['tipos_servicios']
    });
  }

  findOne(id: number) {
    return this.serviciosRepository.findOne({
      where: { id: id },
      relations: ['tipos_servicios'],
    });
  }


  findOnePublicado(id: number) {
    return this.serviciosRepository.findOne({
      where: { id: id, publicado: true },
      relations: ['tipos_servicios'],
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

    const servicioActualizado = await this.serviciosRepository.save(servicio)

    const sv = this.serviciosRepository.findOne({
      where: {id: servicioActualizado.id},
      relations: ['tipos_servicios']
    })

    // Guardar el servicio actualizado
    return sv;
  }

  remove(id: number) {
    return this.serviciosRepository.delete(id);
  }

  // Método para actualizar el estado de 'publicado'
  async actualizarPublicado(id: number, publicado: boolean): Promise<any> {
    const data = await this.serviciosRepository.findOne({
      where: {id: id},
      relations: ['tipos_servicios']
    });
    if (!data) {
      throw new HttpException('servicio no encontrado',HttpStatus.NOT_FOUND);
    }

    if(data.tipos_servicios.length <= 0){
      throw new HttpException('El servicio debe tener al menos un tipo de servicio', HttpStatus.CONFLICT);
    }

    data.publicado = publicado;
    await this.serviciosRepository.save(data);
    return data;
  }
}
