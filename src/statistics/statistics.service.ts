import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Caso } from 'src/casos/entities/caso.entity';
import { Consulta } from 'src/consultas/entities/consulta.entity';
import { TiposServicio } from 'src/tipos-servicios/entities/tipos-servicio.entity';
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
        private readonly consultaRepository: Repository<Consulta>,
        @InjectRepository(TiposServicio)
        private readonly tipoServicioRepository: Repository<TiposServicio>,
    ) { }

    async statisticsCards() {
        const countAbogados = await this.userRepository.count({ where: { role: { nombre: 'Abogado' } }, relations: ['role'] });
        const countCasos = await this.casoRepository.count();
        const countConsultas = await this.consultaRepository.count();
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

    async getCasosYConsultasPorMes() {
        const queryBuilder = this.casoRepository.createQueryBuilder('caso');
        const consultaQueryBuilder = this.consultaRepository.createQueryBuilder('consulta');
    
        // Obtener casos por mes
        const casosPorMes = await queryBuilder
          .select([
            'EXTRACT(YEAR FROM caso.createdAt) AS year',
            'EXTRACT(MONTH FROM caso.createdAt) AS month',
            'COUNT(caso.id) AS totalCasos',
          ])
          .groupBy('year')
          .addGroupBy('month')
          .orderBy('year', 'DESC')
          .addOrderBy('month', 'DESC')
          .getRawMany();
    
        // Obtener consultas por mes
        const consultasPorMes = await consultaQueryBuilder
          .select([
            'EXTRACT(YEAR FROM consulta.createdAt) AS year',
            'EXTRACT(MONTH FROM consulta.createdAt) AS month',
            'COUNT(consulta.id) AS totalConsultas',
          ])
          .groupBy('year')
          .addGroupBy('month')
          .orderBy('year', 'DESC')
          .addOrderBy('month', 'DESC')
          .getRawMany();
    
        // Combine the data from cases and consultations
        const result = casosPorMes.map((caso) => {
          const consulta = consultasPorMes.find(
            (consulta) => consulta.year === caso.year && consulta.month === caso.month
          );
          return {
            year: caso.year,
            month: caso.month,
            totalCasos: caso.totalCasos,
            totalConsultas: consulta ? consulta.totalConsultas : 0, // Si no hay consulta, asignamos 0
          };
        });
    
        return result;
    }
    

    countEspecialidadAbogados() {
        const results = this.userRepository
            .createQueryBuilder('user')
            .select('user.especialidad')
            .addSelect('COUNT(*)', 'total')
            .where('user.especialidad IS NOT NULL && roleId = 2')
            .groupBy('user.especialidad')
            .getRawMany();
        return results;
    }

    countConsultasByTpService(){
        const results = this.tipoServicioRepository
        .createQueryBuilder('tipoServicio')
        .leftJoinAndSelect('tipoServicio.consultas', 'consulta')  // Realizamos un LEFT JOIN con la tabla de consultas
        .groupBy('tipoServicio.id')  // Agrupamos por el ID del tipo de servicio
        .select('tipoServicio.nombre', 'nombre')  // Seleccionamos el nombre del tipo de servicio
        .addSelect('COUNT(consulta.id)', 'cantidadConsultas')  // Contamos las consultas
        .getRawMany();  // Obtenemos el resultado como un array de objetos
        return results;
    }

    countConsultasByServicio() {
        const results = this.tipoServicioRepository
            .createQueryBuilder('tipoServicio')
            .leftJoinAndSelect('tipoServicio.consultas', 'consulta')  // Realizamos un LEFT JOIN con la tabla de consultas
            .leftJoin('tipoServicio.servicio', 'servicio')  // Realizamos un LEFT JOIN con la tabla de Servicio
            .groupBy('servicio.id')  // Agrupamos por el ID del servicio
            .select('servicio.nombre', 'servicio')  // Seleccionamos el nombre del servicio
            .addSelect('COUNT(consulta.id)', 'cantidadConsultas')  // Contamos las consultas asociadas a cada servicio
            .getRawMany();  // Obtenemos el resultado como un array de objetos
        
        return results;
    }
    

    // countTipoClientes() {
    //     const results = this.userRepository
    //         .createQueryBuilder('user')
    //         .select('user.tipo_cliente')
    //         .addSelect('COUNT(*)', 'total')
    //         .where('user.tipo_cliente IS NOT NULL')
    //         .groupBy('user.tipo_cliente')
    //         .getRawMany();
    //     return results;
    // }
}
