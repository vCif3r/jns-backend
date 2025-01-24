import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin','SuperAdmin')
  @Post()
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin','SuperAdmin')
  @Get()
  findAll() {
    return this.areasService.findAll();
  }

  @Get('publicados')
  findAllPublicados() {
    return this.areasService.findAllPublicados();
  }

  @Get('publicado/:id')
  findOnePublicado(@Param('id') id: string) {
    return this.areasService.findOne(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areasService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin','SuperAdmin')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areasService.update(+id, updateAreaDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin','SuperAdmin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areasService.remove(+id);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin','SuperAdmin')
  @Put('publicado/:id')
  async actualizarPublicado(
    @Param('id') id: number,
    @Body() body: { publicado: boolean },
  ): Promise<any> {
    return this.areasService.actualizarPublicado(id, body.publicado);
  }
}
