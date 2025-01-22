import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service';
import { CreateSuscripcionDto } from './dto/create-suscripcion.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('suscripciones')
export class SuscripcionesController {
  constructor(private readonly suscripcionesService: SuscripcionesService) {}
  
  @Post()
  create(@Body() createSuscripcioneDto: CreateSuscripcionDto) {
    return this.suscripcionesService.create(createSuscripcioneDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ) {
    return this.suscripcionesService.findAll(page, limit);
  }

}
