import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PaginationUserDto } from './dto/paginatio.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin','SuperAdmin')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin','SuperAdmin')
  @Get()
  findAll(@Query() getUsersDto: PaginationUserDto) {
    return this.usersService.findAll(getUsersDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin','SuperAdmin')
  @Get('abogados')
  findAllAbogados() {
    return this.usersService.findAllAbogados();
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin','SuperAdmin')
  @Get('abogados/disponibles')
  getAbogadosByEspecialidad() {
    return this.usersService.getAbogadosDispponible();
  }

  // @UseGuards(AuthGuard)
  // @Get('admins')
  // findAllAdmin() {
  //   return this.usersService.findAllAdmin();
  // }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin','SuperAdmin','Abogado')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin','SuperAdmin','Abogado')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: User){
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin','SuperAdmin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
