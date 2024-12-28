import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CasosService } from './casos.service';
import { CreateCasoDto } from './dto/create-caso.dto';
import { UpdateCasoDto } from './dto/update-caso.dto';

@Controller('casos')
export class CasosController {
  constructor(private readonly casosService: CasosService) {}

  @Post()
  create(@Body() createCasoDto: CreateCasoDto) {
    return this.casosService.create(createCasoDto);
  }

  @Get()
  findAll() {
    return this.casosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casosService.findOne(+id);
  }

  @Get('abogado/:idAbogado')
  findAllByAbogado(@Param('idAbogado') idAbogado: string) {
    return this.casosService.findAllByAbogado(+idAbogado);
  }

  @Post('codigo-email')
  findByCodigoAndEmail(@Body() data: any) {
    return this.casosService.findByCodigoAndEmail(data.codigo, data.email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCasoDto: UpdateCasoDto) {
    return this.casosService.update(+id, updateCasoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casosService.remove(+id);
  }
}
