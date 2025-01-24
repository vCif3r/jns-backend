import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetConsultasDto } from './dto/get-consultas.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PaginationConsultaDTO } from './dto/pagination.dto';

@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}
  // public
  @Post()
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultasService.create(createConsultaDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @Get('reportes')
  findConsultaReportes(@Query() getConsultasDto: PaginationConsultaDTO) {
    return this.consultasService.findConsultaReportes(getConsultasDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @Get()
  findAll() {
    return this.consultasService.findAll();
  }

  // lista de consultas sin abogado asignado
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @Get('pendientes')
  findAllPendings(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('servicio') servicio: string,
    @Query('cedula') cedula: string,
  ) {
    return this.consultasService.findAllPendings(
      page,
      pageSize,
      servicio,
      cedula,
    );
  }

  // obtener consultas asignadas para un abogado
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin','Abogado')
  @Get('abogado/:id')
  consultasParaAbogados(
    @Param('id') id: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('servicio') filtroServicio: string = '',
    @Query('cedula') filtroCedula: string = '',
  ) {
    return this.consultasService.consultasParaAbogados(
      +id,
      page,
      pageSize,
      filtroServicio,
      filtroCedula,
    );
  }

  // asignar un abogado a una consulta
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @Patch('asignar')
  asignarAbogado(@Body() body: any) {
    return this.consultasService.asignarAbogado(
      body.idConsulta,
      body.idAbogado,
    );
  }

  // rechazar una consulta
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin','Abogado')
  @Patch('rechazar/:id')
  rechazarConsulta(@Param('id') id: string) {
    return this.consultasService.rechazarConsulta(+id);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin','Abogado')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultasService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @Patch('cancelar/:id')
  cancelarConsulta(@Param('id') id: string) {
    return this.consultasService.cancelarConsulta(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultasService.remove(+id);
  }

 
}
