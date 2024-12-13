import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemandasService } from './demandas.service';
import { CreateDemandaDto } from './dto/create-demanda.dto';
import { UpdateDemandaDto } from './dto/update-demanda.dto';

@Controller('demandas')
export class DemandasController {
  constructor(private readonly demandasService: DemandasService) {}

  @Post()
  create(@Body() createDemandaDto: CreateDemandaDto) {
    return this.demandasService.create(createDemandaDto);
  }

  @Get()
  findAll() {
    return this.demandasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demandasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemandaDto: UpdateDemandaDto) {
    return this.demandasService.update(+id, updateDemandaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demandasService.remove(+id);
  }
}
