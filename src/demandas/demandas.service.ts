import { Injectable } from '@nestjs/common';
import { CreateDemandaDto } from './dto/create-demanda.dto';
import { UpdateDemandaDto } from './dto/update-demanda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Demanda } from './entities/demanda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DemandasService {
  constructor(
    @InjectRepository(Demanda)
    private demandasRepository: Repository<Demanda>,
  ) {}

  create(createDemandaDto: CreateDemandaDto) {
    const demanda = this.demandasRepository.create(createDemandaDto);
    return this.demandasRepository.save(demanda);
  }

  findAll() {
    return this.demandasRepository.find({
      relations: ['cliente', 'abogado'],
    });
  }

  findOne(id: number) {
    return this.demandasRepository.findOne({
      where: { id },
    })
  }

  update(id: number, updateDemandaDto: UpdateDemandaDto) {
    return `This action updates a #${id} demanda`;
  }

  remove(id: number) {
    return `This action removes a #${id} demanda`;
  }
}
