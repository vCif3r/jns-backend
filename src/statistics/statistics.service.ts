import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Caso } from 'src/casos/entities/caso.entity';
import { Consulta } from 'src/consultas/entities/consulta.entity';
import { User } from 'src/users/entities/user.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Caso)
        private readonly casoRepository: Repository<Caso>,
        @InjectRepository(Consulta)
        private readonly ConsultaRepository: Repository<Consulta>,
    ) { }

    async statisticsCards() {
        const countAbogados = await this.userRepository.count({ where: { role: { nombre: 'Abogado' } }, relations: ['role'] });
        const countCasos = await this.casoRepository.count();
        const countConsultas = await this.ConsultaRepository.count();
        const stats = [
            { label: 'Total Abogados', value: countAbogados, icon: 'groups' },
            { label: 'Total Consultas', value: countConsultas, icon: 'pending_actions' },
            { label: 'Total Casos', value: countCasos, icon: 'gavels' },
        ]
        return stats;
    }

    async getLatesAbogados() {
        const fechaInicioMes = new Date();
        fechaInicioMes.setDate(1); // Ponemos el primer día del mes
        fechaInicioMes.setHours(0, 0, 0, 0); // Aseguramos que la hora esté a las 00:00:00
        // Obtener el último día del mes actual
        const fechaFinMes = new Date();
        fechaFinMes.setMonth(fechaFinMes.getMonth() + 1); // Avanzamos al próximo mes
        fechaFinMes.setDate(0); // Ponemos el último día del mes actual
        fechaFinMes.setHours(23, 59, 59, 999); // Aseguramos que la hora esté al final del día

        const latestAbogados = await this.userRepository.find({
            where: { role: { nombre: 'Abogado' } },
            order: { createdAt: 'DESC' },
            take: 5,
            relations: ['role'],
        });

        const countLatestMonth = await this.userRepository.count({
            where: {
                role: { nombre: 'Abogado' }, createdAt: Between(fechaInicioMes, fechaFinMes),
            },
            relations: ['role'],
        });
        const data = {
            listAbogados: latestAbogados,
            countLastMonth: countLatestMonth
        }
        return data;
    }

    async getCasosPorMes() {
        const queryBuilder = this.casoRepository.createQueryBuilder('caso');
    
        // Agrupar los casos por mes y contar los casos en cada mes
        const casosPorMes = await queryBuilder
          .select([
            'EXTRACT(YEAR FROM caso.createdAt) AS year',
            'EXTRACT(MONTH FROM caso.createdAt) AS month',
            'COUNT(caso.id) AS totalCasos',
          ])
          .groupBy('year')
          .addGroupBy('month')
          .orderBy('year', 'DESC') // Ordenar por año de forma descendente
          .addOrderBy('month', 'DESC') // Ordenar por mes de forma descendente
          .getRawMany();
    
        return casosPorMes;
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
