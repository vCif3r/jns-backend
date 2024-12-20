import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateClienteDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.userRepository.find();
  }

  findAllClientes(){
    const clientes = this.userRepository.find({
      relations: ['role'],
      where: {role: {nombre: 'Cliente'}},
    })
    return clientes
  }

  findAllAbogados(){
    const clientes = this.userRepository.find({
      where: {role: {nombre: 'Abogado'}},
      relations: ['role'], 
    })
    return clientes
  }

  findAllAdmin(){
    const clientes = this.userRepository.find({
      where: {role: {nombre: 'Admin'}},
      relations: ['role'], 
    })
    return clientes
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
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
    return this.userRepository.save(cliente);
    //return this.userRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
