import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>
  ){}

  create(createAreaDto: CreateAreaDto) {
    const newArea = this.areaRepository.create(createAreaDto)
    return this.areaRepository.save(newArea);
  }

  findAll() {
    return this.areaRepository.find();
  }

  findOne(id: number) {
    return this.areaRepository.findOneBy({ id });
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return this.areaRepository.update(id, updateAreaDto);;
  }

  remove(id: number) {
    return this.areaRepository.delete(id);
  }
}