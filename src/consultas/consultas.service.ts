import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createConsultaDto: CreateConsultaDto) {
    const consulta = this.consultaRepository.create(createConsultaDto);
    return this.consultaRepository.save(consulta);
  }

  findAll() {
    return this.consultaRepository.find({
      relations: ['tipoServicio','abogado'],
    });
  }

  findOne(id: number) {
    return this.consultaRepository.findOne({
      where: { id: id },
      relations: ['tipoServicio'],
    });
  }

  update(id: number, updateConsultaDto: UpdateConsultaDto) {
    return `This action updates a #${id} consulta`;
  }

  remove(id: number) {
    return this.consultaRepository.delete(id);
  }

  findAllPendings() {
    return this.consultaRepository.find({
      where: {estado: 'pendiente'},
      relations: ['tipoServicio'],
    })
  }

  // metodos para abogados
  async rechazarConsulta(idConsulta: any) {
    const consulta = await this.consultaRepository.findOne({
      where: {id: idConsulta},
      relations: ['abogado']
    })

    if (!consulta) throw new Error('Consulta no encontrada');


    // if (consulta.abogado) {
    //   const abogado = await this.userRepository.findOne({ 
    //     where: {id: consulta.abogado.id}
    //    });
    //   abogado.disponible = true;
    //   await this.userRepository.save(abogado);
    // }
    
    consulta.abogado = null;
    consulta.estado = 'pendiente';
    return await this.consultaRepository.save(consulta);
  }
  

  consultasParaAbogados(id: number) {
    return this.consultaRepository.find({
      where: { abogado: {id: id}, estado: 'revision' },
      relations: ['tipoServicio', 'abogado'],
    });
  }

  // metodo para admin
  async asignarAbogado(idConsulta: number, idAbogado: number) {
    const abogado = await this.userRepository.findOne({ 
      where: { id: idAbogado }, 
      relations: ['consultasAbogado']
    });

    const consulta = await this.consultaRepository.findOne({
      where: { id: idConsulta }
    });

    if (!abogado) throw new Error('Abogado no encontrado');
    
    if (!consulta) throw new Error('Consulta no encontrada');

    if(abogado.consultasAbogado.length >= 4){
      throw new ForbiddenException('Este abogado ha alcanzado su capacidad máxima de consultas asignadas');
    }
    
    consulta.abogado = abogado;
    consulta.estado = 'revision';
    //abogado.disponible = false;
    await this.userRepository.save(abogado);

    return await this.consultaRepository.save(consulta);
  }

  async cancelarConsulta(idConsulta: number) {
    const consulta = await this.consultaRepository.findOne({
      where: { id: idConsulta }
    });
    
    if (!consulta) throw new Error('Consulta no encontrada');
    
    consulta.estado = 'cancelado';
    return await this.consultaRepository.save(consulta);
  }
}
