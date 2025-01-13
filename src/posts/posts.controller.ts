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

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

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
