import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Abogado } from 'src/abogados/entities/abogado.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(Abogado)
        private readonly abogadoRepository: Repository<Abogado>,
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
    ) {}

    async countAbogados(){
        return await this.abogadoRepository.count();
    }

    async countClientes(){
        return await this.clienteRepository.count();
    }
}
