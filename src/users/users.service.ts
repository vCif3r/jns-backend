import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Not, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { PaginationUserDto } from './dto/paginatio.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const passwordHash = await hash(password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,  // Copia todos los atributos del DTO
      password: passwordHash,
    });
    return this.userRepository.save(newUser);
  }

  // findAll() {
  //   return this.userRepository.find({
  //     relations: ['role'],
  //     where: {
  //       role: {
  //         nombre: Not('SuperAdmin') 
  //       }
  //     },
  //   });
  // }

  async findAll(getUsersDto: PaginationUserDto) {
    const { page, pageSize, cedula } = getUsersDto;
  
    // Calculamos el offset según la página solicitada y el tamaño de página
    const skip = (page - 1) * pageSize;
  
    // Empezamos a construir la consulta con createQueryBuilder
    const queryBuilder = this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role') // Unimos la relación de 'role'
      .where('role.nombre != :role', { role: 'SuperAdmin' }); // Excluimos 'SuperAdmin'
  
    // Si se pasa una cédula, agregamos la condición para filtrar por cédula
    if (cedula) {
      queryBuilder.andWhere('user.cedula LIKE :cedula', { cedula: `%${cedula}%` });
    }
  
    // Ejecutamos la consulta con paginación
    const [users, total] = await queryBuilder
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();  // Usamos getManyAndCount para obtener tanto los resultados como el total de registros
  
    return {
      users,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }


  findAllAbogados(){
    const clientes = this.userRepository.find({
      where: {role: {nombre: 'Abogado'}},
      relations: ['role'], 
    })
    return clientes
  }

  getAbogadosDispponible(){
    const abogados = this.userRepository.find({
      where: {role: {nombre: 'Abogado'}, disponible: true},
      relations: ['role'], 
    })
    return abogados
  }

  // findAllAdmin(){
  //   const clientes = this.userRepository.find({
  //     where: {role: {nombre: 'Admin'}},
  //     relations: ['role'], 
  //   })
  //   return clientes
  // }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id }, relations: ['role'],  });
  }

  async update(id: number, updateUserDto: User) {
    const cliente = await this.userRepository.findOne({
      where: { id },
    });
    if (!cliente) {
      throw new Error('cliente no encontrado');
    }

    Object.keys(updateUserDto).forEach(key => {
      if (updateUserDto[key] !== undefined) {
        cliente[key] = updateUserDto[key]; // Asigna el valor solo si está presente
      }
    });
    const updateUser = await this.userRepository.save(cliente);
    return this.userRepository.findOne({
      where: {id: updateUser.id},
      relations: ['role']
    })
    //return this.userRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }


  
}
