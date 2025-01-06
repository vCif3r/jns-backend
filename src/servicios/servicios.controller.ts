import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.serviciosService.findAll();
  }

  @Get('/activos')
  findAllActives() {
    return this.serviciosService.findAllActives();
  }

  @Get('/publicados')
  findPublicados() {
    return this.serviciosService.findServiciosPublicados();
  }

  @Get('/tipos/:id')
  findAllWithTypes(@Param('id') id: string) {
    return this.serviciosService.findAllWithTypes(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviciosService.findOne(+id);
  }

  @Get('publicado/:id')
  findOnePublicado(@Param('id') id: string) {
    return this.serviciosService.findOnePublicado(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicioDto: UpdateServicioDto) {
    return this.serviciosService.update(+id, updateServicioDto);
  }

  @UseGuards(AuthGuard)
  @Put('publicado/:id')
  async actualizarPublicado(
    @Param('id') id: number,
    @Body() body: { publicado: boolean },
  ): Promise<any> {
    return this.serviciosService.actualizarPublicado(id, body.publicado);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviciosService.remove(+id);
  }
}
