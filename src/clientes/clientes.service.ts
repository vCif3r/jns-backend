import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}
  create(createClienteDto: CreateClienteDto) {
    const cliente = this.clientesRepository.create(createClienteDto);
    return this.clientesRepository.save(cliente);
  }

  findAll() {
    return this.clientesRepository.find();
  }

  async obtenerClientesPorCedula(cedula: string): Promise<Cliente[]> {
    // Se busca si la cédula coincide parcialmente (usa el LIKE en SQL)
    return this.clientesRepository.find({
      where: {
        cedula: Like(`${cedula}%`),  // Usamos LIKE para hacer una búsqueda parcial
      },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} cliente`;
  // }

  // update(id: number, updateClienteDto: UpdateClienteDto) {
  //   return `This action updates a #${id} cliente`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cliente`;
  // }


  getClientesTypes() {
    const results = this.clientesRepository
      .createQueryBuilder('cliente')
      .select('cliente.tipo_cliente')
      .addSelect('COUNT(*)', 'total')
      .groupBy('cliente.tipo_cliente')
      .getRawMany();

    console.log(results); 
    return results;
 
  }
}
