import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('clientes')
  findAllClientes() {
    return this.usersService.findAllClientes();
  }

  @UseGuards(AuthGuard)
  @Get('abogados')
  findAllAbogados() {
    return this.usersService.findAllAbogados();
  }

  @UseGuards(AuthGuard)
  @Get('abogados/disponibles')
  getAbogadosByEspecialidad() {
    return this.usersService.getAbogadosDispponible();
  }

  @UseGuards(AuthGuard)
  @Get('admins')
  findAllAdmin() {
    return this.usersService.findAllAdmin();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: User){
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
