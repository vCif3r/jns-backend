import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { Between, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { NotificationsGateway } from 'src/notificaciones/notificaciones.gateway';
import { Notificacion } from 'src/notificaciones/entities/notificacion.entity';
import { NotificacionesService } from 'src/notificaciones/notificaciones.service';
import { GetConsultasDto } from './dto/get-consultas.dto';
import { PaginationConsultaDTO } from './dto/pagination.dto';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
    private readonly notificationsService: NotificacionesService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly notificationsGateway: NotificationsGateway, 
  ) {}
  create(createConsultaDto: CreateConsultaDto) {
    const consulta = this.consultaRepository.create(createConsultaDto);
    return this.consultaRepository.save(consulta);
  }

  async findAll() {
    return  this.consultaRepository.find({
      relations: ['servicio', 'abogado']
    })
  }

  findOne(id: number) {
    return this.consultaRepository.findOne({
      where: { id: id },
      relations: ['servicio'],
    });
  }

 

  remove(id: number) {
    return this.consultaRepository.delete(id);
  }

  async findAllPendings(page: number, pageSize: number, filtroServicio: string = '', filtroCedula: string = '') {
    const skip = (page - 1) * pageSize;

    const queryBuilder = this.consultaRepository.createQueryBuilder('consulta')
      .leftJoinAndSelect('consulta.servicio', 'servicio') // Cargar la relación 'servicio'
      .where('consulta.estado = :estado', { estado: 'pendiente' }); // Filtrar por estado

    // Si existe un filtro de servicio, agregarlo a la consulta
    if (filtroServicio) {
      queryBuilder.andWhere('servicio.nombre LIKE :filtroServicio', { filtroServicio: `%${filtroServicio}%` });
    }

    // Si existe un filtro de cédula, agregarlo a la consulta
    if (filtroCedula) {
      queryBuilder.andWhere('consulta.cedula LIKE :filtroCedula', { filtroCedula: `%${filtroCedula}%` });
    }

    // Paginación
    queryBuilder.skip(skip).take(pageSize)

    // Ejecutar la consulta con paginación y contar los resultados
    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      pageSize,
    };
  }

  

  // metodos para abogados
  async rechazarConsulta(idConsulta: any) {
    const consulta = await this.consultaRepository.findOne({
      where: {id: idConsulta},
      relations: ['abogado']
    })

    if (!consulta) throw new Error('Consulta no encontrada');

    const admins = await this.userRepository.find({ 
       where: {role: {nombre: 'Admin'}},
       relations: ['role']
    });

    const superAdmin = await this.userRepository.findOne({ 
      where: {role: {nombre: 'SuperAdmin'}},
      relations: ['role']
   });
    
   
    const { nombre, apellido } = await consulta.abogado
    consulta.abogado = null;
    consulta.estado = 'pendiente';

    admins.forEach((a)=>{
      this.notificationsGateway.sendNotificationToUser(a.id, `El abogado: ${nombre} ${apellido} rechazó la consulta.`);
    })

    this.notificationsGateway.sendNotificationToUser(superAdmin.id, `El abogado: ${nombre} ${apellido} rechazó la consulta.`);

    return await this.consultaRepository.save(consulta);
  }
  

  async consultasParaAbogados(id: number, page: number, pageSize: number, filtroServicio: string = '', filtroCedula: string = '') {
    const skip = (page - 1) * pageSize;

    const queryBuilder = this.consultaRepository.createQueryBuilder('consulta')
      .leftJoinAndSelect('consulta.servicio', 'servicio') // Relación con servicio
      .leftJoinAndSelect('consulta.abogado', 'abogado') // Relación con abogado
      .where('consulta.estado = :estado', { estado: 'revision' }) // Filtrar por estado 'revision'
      .andWhere('abogado.id = :id', { id }); // Filtrar por ID del abogado

    // Si existe un filtro de servicio, agregarlo a la consulta
    if (filtroServicio) {
      queryBuilder.andWhere('servicio.nombre LIKE :filtroServicio', { filtroServicio: `%${filtroServicio}%` });
    }

    // Si existe un filtro de cédula, agregarlo a la consulta
    if (filtroCedula) {
      queryBuilder.andWhere('consulta.cedula LIKE :filtroCedula', { filtroCedula: `%${filtroCedula}%` });
    }

    // Paginación
    queryBuilder.skip(skip).take(pageSize);

    // Ejecutar la consulta con paginación y contar los resultados
    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      pageSize,
    };
}


  // metodo para admin
  async asignarAbogado(idConsulta: number, idAbogado: any) {
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
    // abogado.disponible = false;
    // await this.userRepository.save(abogado);
    await this.consultaRepository.save(consulta);

    this.notificationsGateway.sendNotificationToUser(abogado.id, `Se te asigno una nueva consulta`);
    return consulta;
  }

  async cancelarConsulta(idConsulta: number) {
    const consulta = await this.consultaRepository.findOne({
      where: { id: idConsulta }
    });
    
    if (!consulta) throw new Error('Consulta no encontrada');
    
    consulta.estado = 'cancelado';
    return await this.consultaRepository.save(consulta);
  }


  // reporte 
  async findConsultaReportes(pagination: PaginationConsultaDTO) {
    const { page, pageSize, cedula, servicio, fechaDesde, fechaHasta } = pagination;
    const skip = (page - 1) * pageSize;
  
    let where: any = {};
  
    // Solo inicializar 'consulta' si es necesario
    if (cedula || fechaDesde || fechaHasta || servicio) {
      where = {};
  
      // Filtro por cédula (usando LIKE)
      if (cedula) {
        where.cedula = Like(`%${cedula}%`);
      }
  
      // Asegurarse de que 'where.servicio' esté inicializado
      if (servicio) {
        if (!where.servicio) {
          where.servicio = {};  // Inicializa 'where.servicio' si no está definido
        }
        where.servicio.nombre = Like(`%${servicio}%`);
      }
  
      // Filtro por rango de fechas
      if (fechaDesde && fechaHasta) {
        where.createdAt = Between(fechaDesde, fechaHasta); // Ajusta 'createdAt' si la fecha está en otro campo
      } else if (fechaDesde) {
        where.createdAt = MoreThanOrEqual(fechaDesde); // Solo filtra por 'desde'
      } else if (fechaHasta) {
        where.createdAt = LessThanOrEqual(fechaHasta); // Solo filtra por 'hasta'
      }
    }
  
    const [casos, total] = await this.consultaRepository.findAndCount({
      where: where,
      relations: ['servicio', 'abogado'],
      order: {
        createdAt: 'DESC',
      },
      skip: skip, 
      take: pageSize, 
    });
  
    const totalPages = Math.ceil(total / pageSize);
    return {
      currentPage: Number(page),
      totalPages: totalPages,
      totalItems: total,
      items: casos,
    };
  }
  
}
