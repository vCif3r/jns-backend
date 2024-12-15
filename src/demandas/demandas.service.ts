import { Injectable } from '@nestjs/common';
import { CreateDemandaDto } from './dto/create-demanda.dto';
import { UpdateDemandaDto } from './dto/update-demanda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Demanda } from './entities/demanda.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Injectable()
export class DemandasService {
  constructor(
    @InjectRepository(Demanda)
    private demandasRepository: Repository<Demanda>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createDemandaDto: CreateDemandaDto, cedula: string): Promise<Demanda> {
    // Buscar el cliente por cedula
    const cliente = await this.clienteRepository.findOne({ where: { cedula } });
    
    // Si no se encuentra el cliente, lanzar un error
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }
  
    // Crear la nueva demanda
    const demanda = this.demandasRepository.create({
      tipo: createDemandaDto.tipo,
      titulo: createDemandaDto.titulo,
      descripcion: createDemandaDto.descripcion,
      // Puedes agregar otros campos aquí si es necesario
    });
  
    // Asignar el cliente a la demanda
    demanda.cliente = cliente;
  
    // Guardar la demanda en la base de datos
    return await this.demandasRepository.save(demanda);
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
