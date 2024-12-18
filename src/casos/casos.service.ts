import { Injectable } from '@nestjs/common';
import { CreateCasoDto } from './dto/create-caso.dto';
import { UpdateCasoDto } from './dto/update-caso.dto';

@Injectable()
export class CasosService {
  create(createCasoDto: CreateCasoDto) {
    return 'This action adds a new caso';
  }

  findAll() {
    return `This action returns all casos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} caso`;
  }

  update(id: number, updateCasoDto: UpdateCasoDto) {
    return `This action updates a #${id} caso`;
  }

  remove(id: number) {
    return `This action removes a #${id} caso`;
  }
}
