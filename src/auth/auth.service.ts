import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterClienteDto } from './dto/register-cliente.dto';
import { RegisterAbogadoDto } from './dto/register-abogado.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { AuthGuard } from './guards/auth.guard';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    private jwtService: JwtService,
  ) { }

  async registerCliente(userObject: RegisterClienteDto) {
    const { password } = userObject;
    const passwordHash = await hash(password, 10);
    const role = await this.roleRepository.findOne({
      where: { nombre: 'Cliente' },
    });
    if (!role) {
      throw new Error('role cliente not found');
    }
    const user = this.userRepository.create({
      ...userObject,
      password: passwordHash,
      role: role, 
    });
    return this.userRepository.save(user);
  }

  async registerAbogado(userObject: RegisterAbogadoDto) {
    const { password } = userObject;
    const passwordHash = await hash(password, 10);
    const role = await this.roleRepository.findOne({
      where: { nombre: 'Abogado' },
    });
    if (!role) {
      throw new Error('role abogado not found');
    }
    const user = this.userRepository.create({
      ...userObject,
      password: passwordHash,
      role: role, 
    });
    return this.userRepository.save(user);
  }


  async registerAdmin(userObject: RegisterAdminDto) {
    const { password } = userObject;
    const passwordHash = await hash(password, 10);
    const role = await this.roleRepository.findOne({
      where: { nombre: 'Admin' },
    });
    if (!role) {
      throw new Error('role admin not found');
    }
    const user = this.userRepository.create({
      ...userObject,
      password: passwordHash,
      role: role, 
    });
    return this.userRepository.save(user);
  }

  // async registerAbogado(userObject: RegisterAbogadoDto) {
  //   const { password } = userObject;
  //   const passwordHash = await hash(password, 10);
  //   userObject = { ...userObject, password: passwordHash };
  //   return this.abogadosRepository.save(userObject);
  // }

  // async registerAdmin(userObject: RegisterAdminDto) {
  //   const { password } = userObject;
  //   const passwordHash = await hash(password, 10);
  //   userObject = { ...userObject, password: passwordHash };
  //   return this.adminsRepository.save(userObject);
  // }

  async login(userObjectLogin: LoginAuthDto): Promise<any> {
    const { email, password } = userObjectLogin;

    const user = await this.userRepository.findOne({ 
      where: { email },
      relations: ['role'], 
    });
    if (!user) throw new BadRequestException('El correo electrónico es incorrecto');

    const checkedPasword = await compare(password, user.password)

    if (!checkedPasword) throw new BadRequestException('Credenciales inválidas');

    const payload = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      foto: user.foto,
      rol: user.role.nombre,
    };

    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  // async login(userObjectLogin: LoginAuthDto): Promise<any> {
  //   const { email, password } = userObjectLogin;

  //   let role;
  //   let findUser;
  //   if (await this.clientesRepository.findOne({ where: { email } })) {
  //     findUser = await this.clientesRepository.findOne({ where: { email } });
  //     role = 'Cliente';
  //   } else if (await this.adminsRepository.findOne({ where: { email } })) {
  //     findUser = await this.adminsRepository.findOne({ where: { email } });
  //     role = 'Admin';
  //   } else if (await this.abogadosRepository.findOne({ where: { email } })) {
  //     findUser = await this.abogadosRepository.findOne({ where: { email } });
  //     role = 'Abogado';
  //   } else {
  //     throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  //   }

  //   const checkedPasword = await compare(password, findUser.password)

  //   if (!checkedPasword) throw new HttpException('Credenciales inválidas', HttpStatus.FORBIDDEN);


  //   const payload = {
  //     id: findUser.id,
  //     nombre: findUser.nombre,
  //     apellido: findUser.apellido,
  //     email: findUser.email,
  //     foto: findUser.foto,
  //     rol: role,
  //   };

  //   const token = this.jwtService.sign(payload);
  //   return {token};
  //   // return {
  //   //   usuario: findUser,
  //   //   token
  //   // };
  // }
}
