import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get('search')
  async buscarClientes(@Query('cedula') cedula: string): Promise<Cliente[]> {
    // Llamamos al servicio para obtener los clientes que coinciden con la cédula
    return this.clientesService.obtenerClientesPorCedula(cedula);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.clientesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
  //   return this.clientesService.update(+id, updateClienteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.clientesService.remove(+id);
  // }

  @Get('tipos/count')
  getUserTypes() {
    return this.clientesService.getClientesTypes();
  }
}
