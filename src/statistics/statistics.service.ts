import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async countAbogados() {
        return await this.userRepository.count(
            { where: { role: { nombre: 'Abogado' } } }
        );
    }

    async countClientes() {
        return await this.userRepository.count(
            { where: { role: { nombre: 'Cliente' } } }
        );
    }


    countEspecialidadAbogados() {
        const results = this.userRepository
          .createQueryBuilder('user')
          .select('user.especialidad')
          .addSelect('COUNT(*)', 'total')
          .where('user.especialidad IS NOT NULL')
          .groupBy('user.especialidad')
          .getRawMany();
        return results;
    }

    countTipoClientes() {
        const results = this.userRepository
          .createQueryBuilder('user')
          .select('user.tipo_cliente')
          .addSelect('COUNT(*)', 'total')
          .where('user.tipo_cliente IS NOT NULL')
          .groupBy('user.tipo_cliente')
          .getRawMany();
        return results;
    }
}
