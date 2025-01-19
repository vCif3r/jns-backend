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
      relations: ['area'],
    })
    return servicioCreado;
  }

  findAll() {
    return this.serviciosRepository.find({
      relations: ['area'],
    });
  }

  findAllActives() {
    return this.serviciosRepository.createQueryBuilder('servicio')
      .leftJoinAndSelect('servicio.tipos_servicios', 'tipos_servicios')
      .where('servicio.disponible = :disponible', { disponible: true })
      .getMany();
  }

  findServiciosPublicados(){
    return this.serviciosRepository.find({
      where: { publicado: true },
      relations: ['area']
    })
  }

  findServiciosPublicadosByArea(id: any){
    return this.serviciosRepository.find({
      where: { publicado: true, area: {id: id} },
      relations: ['area']
    })
  }
  

  findAllWithTypes(id: number){
    return this.serviciosRepository.findOne({ 
      where: { id: id },
      relations: ['area']
    });
  }

  findOne(id: number) {
    return this.serviciosRepository.findOne({
      where: { id: id },
      relations: ['area'],
    });
  }


  findOnePublicado(id: number) {
    return this.serviciosRepository.findOne({
      where: { id: id, publicado: true },
      relations: ['area'],
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
      relations: ['area']
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
      relations: ['area']
    });
    if (!data) {
      throw new HttpException('servicio no encontrado',HttpStatus.NOT_FOUND);
    }

    // if(data.tipos_servicios.length <= 0){
    //   throw new HttpException('El servicio debe tener al menos un tipo de servicio', HttpStatus.CONFLICT);
    // }

    data.publicado = publicado;
    await this.serviciosRepository.save(data);
    return data;
  }
}
