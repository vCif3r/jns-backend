import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ){}

  create(data: any) {
    let publicado: boolean;
    if (data.publicado === 'true' || data.publicado === '1') {
      publicado = true;
    } else if (data.publicado === 'false' || data.publicado === '0') {
      publicado = false;
    } else {
      // Si el valor no es válido, podemos lanzar un error o asignar un valor por defecto
      throw new Error('Valor no válido para la propiedad "publicado".');
    }
    const newPost = this.postRepository.create({
      titulo: data.titulo,
      contenido: data.contenido,
      resumen: data.resumen,
      publicado: publicado,
      categoria: data.categoria,
      imagen: data.imagen,
    })
    return this.postRepository.save(newPost)
  }


  async findAll(paginationDto: PaginationDto) {
    const { page } = paginationDto;

    const skip = (page - 1) * 10;

    const [result, total] = await this.postRepository.findAndCount({
      skip,                  // Para calcular el índice de inicio
      take: 10, // Siempre tomamos la misma cantidad
      order: { createdAt: 'DESC' },
    });

    return {
      data: result,
      totalItems: total,
      totalPages: Math.ceil(total / 10), // Número total de páginas
      currentPage: page,
    };

  }

  async findAllPublished(paginationDto: PaginationDto) {
    const { page } = paginationDto;

    const skip = (page - 1) * 4;

    const [result, total] = await this.postRepository.findAndCount({
      skip,                  // Para calcular el índice de inicio
      take: 4, // Siempre tomamos la misma cantidad
      order: { createdAt: 'DESC' },
      where: {publicado: true}
    });

    return {
      data: result,
      totalItems: total,
      totalPages: Math.ceil(total / 4), // Número total de páginas
      currentPage: page,
    };

  }

  findOne(id: number) {
    return this.postRepository.findOne({
      where: {id: id}
    });
  }

  async update(id: number, data: any): Promise<Post> {
    // Buscar el post a actualizar
    const post = await this.findOne(id);

    if (!post) {
      throw new Error('Post no encontrado');
    }

    // Validación para el campo "publicado"
    let publicado: boolean;
    if (data.publicado === 'true' || data.publicado === '1') {
      publicado = true;
    } else if (data.publicado === 'false' || data.publicado === '0') {
      publicado = false;
    } else {
      throw new Error('Valor no válido para la propiedad "publicado".');
    }

    // Si no se proporciona una nueva imagen, se mantiene la imagen existente
    const imagen = data.imagen || post.imagen;  // Si no se pasa nueva imagen, mantenemos la actual

    // Actualizar los campos del post
    post.titulo = data.titulo || post.titulo;
    post.contenido = data.contenido || post.contenido;
    post.categoria = data.categoria || post.categoria;
    post.publicado = publicado;
    post.resumen = data.resumen || post.resumen,
    post.imagen = imagen;  // Usamos la nueva imagen o la original

    // Guardamos el post actualizado en la base de datos
    return this.postRepository.save(post);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }

  async actualizarPublicado(id: number, publicado: boolean): Promise<any> {
      const data = await this.postRepository.findOne({
        where: {id: id},
      });
      if (!data) {
        throw new HttpException('post no encontrado',HttpStatus.NOT_FOUND);
      }
  
      data.publicado = publicado;
      await this.postRepository.save(data);
      return data;
  }
}
