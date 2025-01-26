import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCasoDto } from './dto/create-caso.dto';
import { UpdateCasoDto } from './dto/update-caso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Caso } from './entities/caso.entity';
import { Between, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { Consulta } from 'src/consultas/entities/consulta.entity';
import { PaginationCasoDTO } from './dto/pagination.dto';

@Injectable()
export class CasosService {
  constructor(
    @InjectRepository(Caso)
    private readonly casoRepository: Repository<Caso>,
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
  ) { }

  async create(createCasoDto: CreateCasoDto) {
    const caso = await this.casoRepository.create(createCasoDto);
    const casoGuardado = await this.casoRepository.save(caso);

    const findCasoguardado = await this.casoRepository.findOne({
      where: { id: casoGuardado.id },
      relations: ['consulta'],
    });

    const consulta = await this.consultaRepository.findOne({
      where: { id: findCasoguardado.consulta.id },
    });
    if (!consulta) {
      throw new Error('Consulta no encontrada');
    }
    consulta.estado = 'aprobado';
    await this.consultaRepository.save(consulta);
    return casoGuardado;
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
    estado?: string,
    cedula?: string,
    orderBy: string = 'createdAt',
    orderDirection: 'ASC' | 'DESC' = 'DESC',
  ) {
    const skip = (page - 1) * pageSize;

    // Inicializar el objeto `where` que se pasará al `findAndCount`
    const where: any = {};

    // Solo inicializar 'consulta' si es necesario
    if (cedula || estado) {
      where.consulta = {};

      if (cedula) {
        where.consulta.cedula = Like(`%${cedula}%`);
      }

      if (estado) {
        where.estado = estado;
      }
    }

    // Obtener el total de registros que cumplen con la condición
    const [casos, total] = await this.casoRepository.findAndCount({
      where: where,
      relations: ['consulta', 'consulta.servicio', 'consulta.abogado'],
      order: {
        [orderBy]: orderDirection, // Ordenar por el campo especificado
      },
      skip: skip, // Omite los registros según la página solicitada
      take: pageSize, // Limita la cantidad de resultados por página
    });

    // Calcular el total de páginas
    const totalPages = Math.ceil(total / pageSize);

    return {
      currentPage: Number(page),
      totalPages: totalPages,
      totalItems: total,
      items: casos,
    };
  }

  async findAllByAbogado(idAbogado: number, paginationDto: PaginationCasoDTO) {
    const { page, pageSize, estado, cedula, orderBy, orderDirection } = paginationDto;
    const skip = (page - 1) * pageSize;
    const where: any = {
      consulta: { abogado: { id: idAbogado } },
    };
    if (cedula || estado) {
      where.consulta = {};

      if (cedula) {
        where.consulta.cedula = Like(`%${cedula}%`);
      }

      if (estado) {
        where.estado = estado;
      }
    }
    const [casos, total] = await this.casoRepository.findAndCount({
      where: where,
      relations: ['consulta', 'consulta.servicio', 'consulta.abogado'],
      order: {
        [orderBy]: orderDirection,
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

  findOne(id: number) {
    return this.casoRepository.findOne({
      where: { id: id },
      relations: ['consulta', 'consulta.servicio', 'consulta.abogado'],
    });
  }

  async findByCodigoAndEmail(codigo: string, email: string) {
    const caso = await this.casoRepository.findOne({
      relations: ['consulta'],
      where: { consulta: { email: email }, codigo: codigo },
    });

    if (!caso) throw new HttpException('Caso no encontrado, correo o código ingresado no coinciden',HttpStatus.NOT_FOUND);
    return caso;
  }

  async update(id: number, updateCasoDto: UpdateCasoDto) {
    const caso = await this.casoRepository.findOne({
      where: { id: id },
      relations: ['consulta', 'consulta.servicio', 'consulta.abogado'],
    });

    if (!caso) throw new Error('Caso no encontrado');
    caso.estado = updateCasoDto.estado;

    return this.casoRepository.save(caso);
  }

  remove(id: number) {
    return this.casoRepository.delete(id);
  }

  async findCasosReportes(
    page: number = 1,
    pageSize: number = 10,
    estado?: string,
    cedula?: string,
    fechaDesde?: Date, // Fecha de inicio del rango
    fechaHasta?: Date, // Fecha de fin del rango
    codigo?: number, // ID para filtrar
    orderBy: string = 'createdAt',
    orderDirection: 'ASC' | 'DESC' = 'DESC',
  ) {
    const skip = (page - 1) * pageSize;

    // Inicializar el objeto `where` que se pasará al `findAndCount`
    const where: any = {};

    // Solo inicializar 'consulta' si es necesario
    if (cedula || estado || fechaDesde || fechaHasta || codigo) {
      where.consulta = {};

      // Filtro por cédula (usando LIKE)
      if (cedula) {
        where.consulta.cedula = Like(`%${cedula}%`);
      }

      // Filtro por estado
      if (estado) {
        where.estado = estado;  // Suponiendo que 'estado' es un campo en 'consulta'
      }

      // Filtro por rango de fechas
      if (fechaDesde && fechaHasta) {
        where.createdAt = Between(fechaDesde, fechaHasta); // Ajusta 'createdAt' si la fecha está en otro campo
      } else if (fechaDesde) {
        where.createdAt = MoreThanOrEqual(fechaDesde); // Solo filtra por 'desde'
      } else if (fechaHasta) {
        where.createdAt = LessThanOrEqual(fechaHasta); // Solo filtra por 'hasta'
      }
      if (codigo) {
        where.codigo = Like(`%${codigo}%`);
      }
    }

    // Obtener el total de registros que cumplen con la condición
    const [casos, total] = await this.casoRepository.findAndCount({
      where: where,
      relations: ['consulta', 'consulta.servicio', 'consulta.abogado'],
      order: {
        [orderBy]: orderDirection, // Ordenar por el campo especificado
      },
      skip: skip, // Omite los registros según la página solicitada
      take: pageSize, // Limita la cantidad de resultados por página
    });

    // Calcular el total de páginas
    const totalPages = Math.ceil(total / pageSize);

    return {
      currentPage: Number(page),
      totalPages: totalPages,
      totalItems: total,
      items: casos,
    };
  }

}
