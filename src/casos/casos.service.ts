import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    consulta.estado = "aprobado ";
    await this.consultaRepository.save(consulta);
    return casoGuardado;
  }

  findAll() {
    return this.casoRepository.find({
      relations: ['consulta','consulta.tipoServicio','consulta.abogado']
    });
  }


  findByAbogado(idAbogado: number){
    return this.casoRepository.find({
      relations: ['consulta','consulta.tipoServicio','consulta.abogado'],
      where: { consulta: { abogado: { id: idAbogado}} },
    })
  }


  findAllByAbogado(idAbogado: number) {
    return this.casoRepository.find({
      where: { consulta: { abogado: { id: idAbogado}} },
      relations: ['consulta','consulta.tipoServicio','consulta.abogado']
    })
  }

  findOne(id: number) {
    return this.casoRepository.findOne({
      where: { id: id },
      relations: ['consulta','consulta.tipoServicio','consulta.abogado']
    });
  }

  async findByCodigoAndEmail(codigo: string, email: string) {
    const caso = await this.casoRepository.findOne({
      relations: ['consulta'],
      where: { consulta: { email: email} },
    })

    if(!caso) throw new HttpException('Caso no encontrado con el correo ingresado', HttpStatus.NOT_FOUND);

    let codigoEncontrado = false
    if(caso.codigo === codigo){
      codigoEncontrado = true;
    }

    if(!codigoEncontrado) throw new HttpException('El código de caso no coincide con el ingresado', HttpStatus.NOT_FOUND);

    return caso;
  }

  async update(id: number, updateCasoDto: UpdateCasoDto) {
    const caso = await this.casoRepository.findOne({
      where: { id: id },
      relations: ['consulta','consulta.tipoServicio','consulta.abogado']
    });

    if (!caso) throw new Error('Caso no encontrado');
    caso.estado = updateCasoDto.estado
    
    return this.casoRepository.save(caso)
  }

  remove(id: number) {
    return this.casoRepository.delete(id);
  }
}
