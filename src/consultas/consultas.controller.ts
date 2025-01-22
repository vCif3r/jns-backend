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

@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @Post()
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultasService.create(createConsultaDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.consultasService.findAll();
  }

  // lista de consultas sin abogado asignado
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @Patch('asignar')
  asignarAbogado(@Body() body: any) {
    return this.consultasService.asignarAbogado(
      body.idConsulta,
      body.idAbogado,
    );
  }

  // rechazar una consulta
  @UseGuards(AuthGuard)
  @Patch('rechazar/:id')
  rechazarConsulta(@Param('id') id: string) {
    return this.consultasService.rechazarConsulta(+id);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultasService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsultaDto: UpdateConsultaDto,
  ) {
    return this.consultasService.update(+id, updateConsultaDto);
  }

  @Patch('cancelar/:id')
  cancelarConsulta(@Param('id') id: string) {
    return this.consultasService.cancelarConsulta(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultasService.remove(+id);
  }
}
