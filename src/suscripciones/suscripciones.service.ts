import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSuscripcionDto } from './dto/create-suscripcion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Suscripcion } from './entities/suscripcion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuscripcionesService {

  constructor(
    @InjectRepository(Suscripcion)
    private readonly suscripcionRepository: Repository<Suscripcion>
  ) {}

  async create(createSuscripcioneDto: CreateSuscripcionDto) {
    const newSuscripcion = this.suscripcionRepository.create(createSuscripcioneDto);

    const existingSuscripcion = await this.suscripcionRepository.findOne({
      where: { email: newSuscripcion.email }
    });

    if(existingSuscripcion){
      throw new HttpException('El email ya se encuentra registrado.', HttpStatus.BAD_REQUEST);
      
    }else{
      return this.suscripcionRepository.save(newSuscripcion);
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const pageNumber = page < 1 ? 1 : page;
    const pageSize = limit < 1 ? 10 : limit;

    // Calcular el salto (offset) en base a la página y el límite
    const [result, total] = await this.suscripcionRepository.findAndCount({
      skip: (pageNumber - 1) * pageSize,  // Offset: (Página - 1) * Limit
      take: pageSize,                      // Limitar la cantidad de registros
    });

    return {
      data: result,
      totalCount: total,
      currentPage: Number(pageNumber) ,
      totalPages: Math.ceil(total / pageSize), // Total de páginas
    };
  }

}
