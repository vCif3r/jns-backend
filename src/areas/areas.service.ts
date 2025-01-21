import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return this.areaRepository.find({
      relations: ['servicios']
    });
  }

  findAllPublicados(){
    return this.areaRepository.find({
      where: { publicado: true },
      relations: ['servicios']
    })
  }

  findOnePublicado(id: any){
    return this.areaRepository.findOne({
      where: { id: id, publicado: true },
    })
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


  async actualizarPublicado(id: number, publicado: boolean): Promise<any> {
      const data = await this.areaRepository.findOne({
        where: {id: id},
        relations: ['servicios']
      });
      if (!data) {
        throw new HttpException('servicio no encontrado',HttpStatus.NOT_FOUND);
      }
  
      if(data.servicios.length <= 0){
        throw new HttpException('El área debe tener al menos un servicio', HttpStatus.CONFLICT);
      }

      data.publicado = publicado;
      await this.areaRepository.save(data);
      return data;
    }
}
