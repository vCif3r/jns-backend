import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposServiciosService } from './tipos-servicios.service';
import { CreateTiposServicioDto } from './dto/create-tipos-servicio.dto';
import { UpdateTiposServicioDto } from './dto/update-tipos-servicio.dto';

@Controller('tipos-servicios')
export class TiposServiciosController {
  constructor(private readonly tiposServiciosService: TiposServiciosService) {}

  @Post()
  create(@Body() createTiposServicioDto: CreateTiposServicioDto) {
    return this.tiposServiciosService.create(createTiposServicioDto);
  }

  @Get()
  findAll() {
    return this.tiposServiciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposServiciosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposServicioDto: UpdateTiposServicioDto) {
    return this.tiposServiciosService.update(+id, updateTiposServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposServiciosService.remove(+id);
  }
}
