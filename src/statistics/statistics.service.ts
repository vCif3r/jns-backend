import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Caso } from 'src/casos/entities/caso.entity';
import { Consulta } from 'src/consultas/entities/consulta.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { TiposServicio } from 'src/tipos-servicios/entities/tipos-servicio.entity';
import { User } from 'src/users/entities/user.entity';
import { Between, Not, Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Caso)
    private readonly casoRepository: Repository<Caso>,
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async statisticsCards() {
    const countAbogados = await this.userRepository.count({
      where: { role: { nombre: 'Abogado' } },
      relations: ['role'],
    });
    const countCasos = await this.casoRepository.count();
    const countConsultas = await this.consultaRepository.count();
    const stats = [
      { label: 'Total Abogados', value: countAbogados, icon: 'groups' },
      {
        label: 'Total Consultas',
        value: countConsultas,
        icon: 'pending_actions',
      },
      { label: 'Total Casos', value: countCasos, icon: 'gavels' },
    ];
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
      where: {
        role: { nombre: 'Abogado' },
        createdAt: Between(fechaInicioMes, fechaFinMes),
      },
      order: { createdAt: 'DESC' },
      take: 5,
      relations: ['role'],
    });

    const countLatestMonth = await this.userRepository.count({
      where: {
        role: { nombre: 'Abogado' },
        createdAt: Between(fechaInicioMes, fechaFinMes),
      },
      relations: ['role'],
    });
    const data = {
      listAbogados: latestAbogados,
      countLastMonth: countLatestMonth,
    };
    return data;
  }

  async getCasosYConsultasPorMes() {
    const queryBuilder = this.casoRepository.createQueryBuilder('caso');
    const consultaQueryBuilder =
      this.consultaRepository.createQueryBuilder('consulta');

    const currentYear = new Date().getFullYear(); // Año actual

    // Obtener casos por mes para el año actual
    const casosPorMes = await queryBuilder
      .select([
        'EXTRACT(YEAR FROM caso.createdAt) AS year',
        'EXTRACT(MONTH FROM caso.createdAt) AS month',
        'COUNT(caso.id) AS totalCasos',
      ])
      .where('EXTRACT(YEAR FROM caso.createdAt) = :currentYear', {
        currentYear,
      })
      .groupBy('year')
      .addGroupBy('month')
      .orderBy('year', 'DESC')
      .addOrderBy('month', 'DESC')
      .getRawMany();

    // Obtener consultas por mes para el año actual
    const consultasPorMes = await consultaQueryBuilder
      .select([
        'EXTRACT(YEAR FROM consulta.createdAt) AS year',
        'EXTRACT(MONTH FROM consulta.createdAt) AS month',
        'COUNT(consulta.id) AS totalConsultas',
      ])
      .where('EXTRACT(YEAR FROM consulta.createdAt) = :currentYear', {
        currentYear,
      })
      .groupBy('year')
      .addGroupBy('month')
      .orderBy('year', 'DESC')
      .addOrderBy('month', 'DESC')
      .getRawMany();

    // Combinar los datos de casos y consultas
    const result = consultasPorMes.map((consulta) => {
      const caso = casosPorMes.find(
        (caso) => caso.year === caso.year && caso.month === caso.month,
      );
      return {
        year: consulta.year,
        month: consulta.month,
        totalCasos: caso ? caso.totalCasos : 0,
        totalConsultas: consulta ? consulta.totalConsultas : 0, // Si no hay consulta, asignamos 0
      };
    });

    return result;
  }

  async countEspecialidadAbogados() {
    const { id } = await this.roleRepository.findOne({
      where: {nombre: 'Abogado'},
    })
    const results = this.userRepository
      .createQueryBuilder('user')
      .select('user.especialidad')
      .addSelect('COUNT(*)', 'total')
      .where(`user.especialidad IS NOT NULL && roleId = ${id}`)
      .groupBy('user.especialidad')
      .getRawMany();
    return results;
  }

//   async countConsultasByTpService() {  
//     const currentYear = new Date().getFullYear(); 

//     const results = await this.tipoServicioRepository
//       .createQueryBuilder('tipoServicio')
//       .leftJoinAndSelect('tipoServicio.consultas', 'consulta') 
//       .where('EXTRACT(YEAR FROM consulta.createdAt) = :currentYear', {
//         currentYear,
//       }) 
//       .groupBy('tipoServicio.id') 
//       .select('tipoServicio.nombre', 'nombre') 
//       .addSelect('COUNT(consulta.id)', 'cantidadConsultas') 
//       .getRawMany(); 

//     return results;
//   }

  async countConsultasByServicio() {
    const currentYear = new Date().getFullYear(); // Año actual

  const results = await this.servicioRepository
    .createQueryBuilder('servicio')
    .leftJoinAndSelect('servicio.consultas', 'consulta') // LEFT JOIN con la relación 'consultas'
    .where('EXTRACT(YEAR FROM consulta.createdAt) = :currentYear', { currentYear })
    .groupBy('servicio.id') // Agrupamos por el ID del servicio
    .select('servicio.nombre', 'servicio') // Seleccionamos el nombre del servicio
    .addSelect('COUNT(consulta.id)', 'cantidadConsultas') // Contamos las consultas asociadas
    .getRawMany(); // Obtenemos el resultado como un array de objetos

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

  async getCaracteristicasHome(){
    const totalAbogados = await this.userRepository.count({
      where: { role: { nombre: 'Abogado' } },
      relations: ['role'],
    })

    const totalCasosResueltos = await this.casoRepository.count({
      where: { estado: 'Resuelto'}
    })

    const totalCasosEnCursos = await this.casoRepository.count({
      where: { estado: Not('Resuelto')}
    })

    const totalConsultas = await this.consultaRepository.count();

    const result = [
      {
        icon: 'person',
        label: 'Nuestros Abogados',
        value: totalAbogados,
      },
      {
        icon: 'assignment',
        label: 'Total consultas',
        value: totalConsultas,
      },
      {
        icon: 'check',
        label: 'Casos resueltos',
        value: totalCasosResueltos,
      },
      {
        icon: 'business_center',
        label: 'Casos en curso',
        value: totalCasosEnCursos,
      }
    ]
    return result

  }
}
