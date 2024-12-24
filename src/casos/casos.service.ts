import { Injectable } from '@nestjs/common';
import { CreateCasoDto } from './dto/create-caso.dto';
import { UpdateCasoDto } from './dto/update-caso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Caso } from './entities/caso.entity';
import { Repository } from 'typeorm';
import { Consulta } from 'src/consultas/entities/consulta.entity';

@Injectable()
export class CasosService {

  constructor(
    @InjectRepository(Caso)
    private readonly casoRepository: Repository<Caso>,
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
  ){}

  async create(createCasoDto: CreateCasoDto,) {
    const caso = await this.casoRepository.create(createCasoDto);
    const casoGuardado = await this.casoRepository.save(caso);

    const findCasoguardado = await this.casoRepository.findOne({
      where: { id: casoGuardado.id },
      relations: ['consulta']
    })

    const consulta = await this.consultaRepository.findOne({
      where: {id: findCasoguardado.consulta.id}
    })
    if (!consulta) {
      throw new Error('Consulta no encontrada');
    }
    consulta.estado = "finalizado";
    await this.consultaRepository.save(consulta);
    return casoGuardado;
  }

  findAll() {
    return this.casoRepository.find({
      relations: ['consulta']
    });
  }


  findAllByAbogado(idAbogado: number) {
    return this.casoRepository.find({
      where: { consulta: { abogado: { id: idAbogado}} },
      relations: ['consulta']
    })
  }

  findOne(id: number) {
    return this.casoRepository.findOne({
      where: { id: id },
      relations: ['consulta']
    });
  }

  findByCodigo(codigo: any) {
    return this.casoRepository.findOne({
      where: { codigo: codigo },
      relations: ['consulta']
    })
  }

  update(id: number, updateCasoDto: UpdateCasoDto) {
    return `This action updates a #${id} caso`;
  }

  remove(id: number) {
    return this.casoRepository.delete(id);
  }
}
