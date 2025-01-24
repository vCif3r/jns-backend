import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CasosService } from './casos.service';
import { CreateCasoDto } from './dto/create-caso.dto';
import { UpdateCasoDto } from './dto/update-caso.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PaginationCasoDTO } from './dto/pagination.dto';

@Controller('casos')
export class CasosController {
  constructor(private readonly casosService: CasosService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin','Abogado')
  @Get('reportes')
  async findCasosReportes(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('estado') estado?: string,
    @Query('cedula') cedula?: string,
    @Query('fechaDesde') fechaDesde?: Date, // Fecha de inicio del rango
    @Query('fechaHasta') fechaHasta?: Date, // Fecha de fin del rango
    @Query('codigo') codigo?: number, // ID para filtrar
    @Query('orderBy') orderBy: string = 'createdAt',
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'DESC',
  ) {
    if (estado) {
      estado = decodeURIComponent(estado); // Decodifica el valor de 'estado'
    }
    return this.casosService.findCasosReportes(
      page,
      pageSize,
      estado,
      cedula,
      fechaDesde,
      fechaHasta,
      codigo,
      orderBy,
      orderDirection,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin','Abogado')
  @Post()
  create(@Body() createCasoDto: CreateCasoDto) {
    return this.casosService.create(createCasoDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @Get()
  async findAll(
    @Query('page') page: number = 1, 
    @Query('pageSize') pageSize: number = 10, 
    @Query('estado') estado?: string, 
    @Query('cedula') cedula?: string,
    @Query('orderBy') orderBy: string = 'createdAt', 
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'DESC'  // Dirección del orden
  ) {
    if (estado) {
      estado = decodeURIComponent(estado); // Decodifica el valor de 'estado'
    }
    return this.casosService.findAll(page, pageSize,estado, cedula, orderBy, orderDirection);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin','Abogado')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casosService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin','Abogado')
  @Get('abogado/:idAbogado')
  findAllByAbogado(@Param('idAbogado') idAbogado: string,@Query() paginationDto: PaginationCasoDTO) {
    if (paginationDto.estado) {
      paginationDto.estado = decodeURIComponent(paginationDto.estado); // Decodifica el valor de 'estado'
    }
    return this.casosService.findAllByAbogado(+idAbogado, paginationDto);
  }
  //public
  @Post('codigo-email')
  findByCodigoAndEmail(@Body() data: any) {
    return this.casosService.findByCodigoAndEmail(data.codigo, data.email);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin','Abogado')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCasoDto: UpdateCasoDto) {
    return this.casosService.update(+id, updateCasoDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casosService.remove(+id);
  }


}
