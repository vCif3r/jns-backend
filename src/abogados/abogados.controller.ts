import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AbogadosService } from './abogados.service';
import { CreateAbogadoDto } from './dto/create-abogado.dto';
import { UpdateAbogadoDto } from './dto/update-abogado.dto';

@Controller('abogados')
export class AbogadosController {
  constructor(private readonly abogadosService: AbogadosService) {}

  @Post()
  create(@Body() createAbogadoDto: CreateAbogadoDto) {
    return this.abogadosService.create(createAbogadoDto);
  }

  @Get()
  findAll() {
    return this.abogadosService.findAll();
  }

  @Get('especialidad/count')
  getAbogadosEspecialidad() {
    return this.abogadosService.getAbogadosEspecialidad();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abogadosService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbogadoDto: UpdateAbogadoDto) {
    return this.abogadosService.update(+id, updateAbogadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abogadosService.remove(+id);
  }
}
