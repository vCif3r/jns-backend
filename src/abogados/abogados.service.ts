import { Injectable } from '@nestjs/common';
import { CreateAbogadoDto } from './dto/create-abogado.dto';
import { UpdateAbogadoDto } from './dto/update-abogado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Abogado } from './entities/abogado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AbogadosService {
  constructor(
    @InjectRepository(Abogado)
    private abogadosRepository: Repository<Abogado>,
  ) {}
  create(createAbogadoDto: CreateAbogadoDto) {
    return 'This action adds a new abogado';
  }

  findAll() {
    return this.abogadosRepository.find(); 
  }

  getAbogadosEspecialidad() {
    const results = this.abogadosRepository
      .createQueryBuilder('abogado')
      .select('abogado.especialidad')
      .addSelect('COUNT(*)', 'total')
      .groupBy('abogado.especialidad')
      .getRawMany();
    return results;
 
  }

  findOne(id: number) {
    return `This action returns a #${id} abogado`;
  }

  update(id: number, updateAbogadoDto: UpdateAbogadoDto) {
    return `This action updates a #${id} abogado`;
  }

  remove(id: number) {
    return `This action removes a #${id} abogado`;
  }
}
