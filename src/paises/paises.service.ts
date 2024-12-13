import { Injectable } from '@nestjs/common';
import { CreatePaiseDto } from './dto/create-paise.dto';
import { UpdatePaiseDto } from './dto/update-paise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pais } from './entities/pais.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais)
    private paisesRepository: Repository<Pais>,
  ) {}


  create(createPaiseDto: CreatePaiseDto) {
    const pais = this.paisesRepository.create(createPaiseDto);
    return this.paisesRepository.save(pais);
  }

  findAll() {
    return this.paisesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} paise`;
  }

  update(id: number, updatePaiseDto: UpdatePaiseDto) {
    return `This action updates a #${id} paise`;
  }

  remove(id: number) {
    return `This action removes a #${id} paise`;
  }
}
