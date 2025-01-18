import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PaginationDto } from './dto/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', { 
    storage: diskStorage({
      destination: './uploads', // Directorio donde se guardan las imágenes
      filename: (req, file, callback) => {
        const filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
      },
    }),
  }))
  create(@Body() createPostDto: CreatePostDto,@UploadedFile() image: Express.Multer.File) {
    const imageUrl = image ? `/uploads/${image.filename}` : null;

    return this.postsService.create({
      titulo: createPostDto.titulo,
      contenido: createPostDto.contenido,
      categoria: createPostDto.categoria,
      resumen: createPostDto.resumen,
      imagen: imageUrl,
      publicado: createPostDto.publicado
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }

  // metodo publico para usuarios lean el blog

  @Get('publicados')
  findAllPublished(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAllPublished(paginationDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Put(':id')  // Usamos PUT para actualizar un post existente
  @UseInterceptors(FileInterceptor('image', { 
    storage: diskStorage({
      destination: './uploads',  // Directorio donde se guardan las imágenes
      filename: (req, file, callback) => {
        const filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
      },
    }),
  }))
  async update(
    @Param('id') id: any,  // ID del post a actualizar
    @Body() updatePostDto: UpdatePostDto,  // Datos para actualizar
    @UploadedFile() image: Express.Multer.File,  // Imagen (si es proporcionada)
  ) {
    let imageUrl: string | null = null;

    // Si se proporciona una imagen nueva, se guarda la nueva URL de la imagen
    if (image) {
      imageUrl = `/uploads/${image.filename}`;
    } else {
      // Si no se proporciona una imagen, no cambiamos la imagen existente
      const post = await this.postsService.findOne(+id);  // Obtenemos el post original para conservar su imagen
      imageUrl = post.imagen;  // Usamos la imagen original del post
    }

    // Actualizamos el post en la base de datos
    return this.postsService.update(id, {
      titulo: updatePostDto.titulo,
      contenido: updatePostDto.contenido,
      categoria: updatePostDto.categoria,
      resumen: updatePostDto.resumen,
      imagen: imageUrl,  // Imagen nueva o la original
      publicado: updatePostDto.publicado
    });
  }


  // @UseGuards(AuthGuard)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @UseGuards(AuthGuard)
    @Put('publicado/:id')
    async actualizarPublicado(
      @Param('id') id: number,
      @Body() body: { publicado: boolean },
    ): Promise<any> {
      return this.postsService.actualizarPublicado(id, body.publicado);
    }
}
