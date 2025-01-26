import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PaginationDto } from './dto/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly imageService: CloudinaryService
  ) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin', 'Editor')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    let imageUrl = null;
    if (image) {
      imageUrl = await this.imageService.uploadFile(image);  // Obtén la URL de Cloudinary
    }
    // Guardamos el post en la base de datos, junto con la URL de la imagen
    return this.postsService.create({
      titulo: createPostDto.titulo,
      contenido: createPostDto.contenido,
      categoria: createPostDto.categoria,
      resumen: createPostDto.resumen,
      imagen: imageUrl.url,
      publicado: createPostDto.publicado,
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin', 'Editor')
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }

  // metodo publico para usuarios lean el blog

  @Get('publicados')
  findAllPublished(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAllPublished(paginationDto);
  }

  @Get('publicados/:id')
  findPostPublicado(@Param('id') id: string) {
    return this.postsService.findPostPublicado(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin', 'Editor')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin', 'Editor')
  @Put(':id') // Usamos PUT para actualizar un post existente
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: any, // ID del post a actualizar
    @Body() updatePostDto: UpdatePostDto, // Datos para actualizar
    @UploadedFile() image: Express.Multer.File, // Imagen (si es proporcionada)
  ) {
    let imageUrl = null;
    if (image) {
      try {
        imageUrl = await this.imageService.uploadFile(image);
      } catch (error) {
        throw new Error('Error al subir la imagen a Cloudinary');
      }
    } else {
      const post = await this.postsService.findOne(+id); // Obtenemos el post original
      imageUrl = post.imagen; // Usamos la imagen original del post
    }

    // Actualizamos el post en la base de datos, ya sea con la nueva URL de la imagen o la original
    return this.postsService.update(id, {
      titulo: updatePostDto.titulo,
      contenido: updatePostDto.contenido,
      categoria: updatePostDto.categoria,
      resumen: updatePostDto.resumen,
      imagen: imageUrl.url,
      publicado: updatePostDto.publicado,
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin', 'Editor')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin', 'Editor')
  @Put('publicado/:id')
  async actualizarPublicado(
    @Param('id') id: number,
    @Body() body: { publicado: boolean },
  ): Promise<any> {
    return this.postsService.actualizarPublicado(id, body.publicado);
  }
}
