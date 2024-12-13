import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admins/entities/admin.entity';
import { Abogado } from 'src/abogados/entities/abogado.entity';
import { RegisterClienteDto } from './dto/register-cliente.dto';
import { RegisterAbogadoDto } from './dto/register-abogado.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,

    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,

    @InjectRepository(Abogado)
    private abogadosRepository: Repository<Abogado>,
    private jwtService: JwtService,
  ) {}

  async registerCliente(userObject: RegisterClienteDto) {
    const { password } = userObject;
    const passwordHash = await hash(password, 10);
    userObject = { ...userObject, password: passwordHash };
    return this.clientesRepository.save(userObject);
  }

  async registerAbogado(userObject: RegisterAbogadoDto) {
    const { password } = userObject;
    const passwordHash = await hash(password, 10);
    userObject = { ...userObject, password: passwordHash };
    return this.abogadosRepository.save(userObject);
  }

  async registerAdmin(userObject: RegisterAdminDto) {
    const { password } = userObject;
    const passwordHash = await hash(password, 10);
    userObject = { ...userObject, password: passwordHash };
    return this.adminsRepository.save(userObject);
  }

  async login(userObjectLogin: LoginAuthDto): Promise<any> {
    const { email, password } = userObjectLogin;

    let role;
    let findUser;
    if (await this.clientesRepository.findOne({ where: { email } })) {
      findUser = await this.clientesRepository.findOne({ where: { email } });
      role = 'Cliente';
    } else if (await this.adminsRepository.findOne({ where: { email } })) {
      findUser = await this.adminsRepository.findOne({ where: { email } });
      role = 'Admin';
    } else if (await this.abogadosRepository.findOne({ where: { email } })) {
      findUser = await this.abogadosRepository.findOne({ where: { email } });
      role = 'Abogado';
    } else {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const checkedPasword = await compare(password, findUser.password)

    if (!checkedPasword) throw new HttpException('Credenciales inválidas', HttpStatus.FORBIDDEN);
    

    const payload = {
      id: findUser.id,
      nombre: findUser.nombre,
      apellido: findUser.apellido,
      email: findUser.email,
      foto: findUser.foto,
      rol: role,
    };

    const token = this.jwtService.sign(payload);
    return {token};
    // return {
    //   usuario: findUser,
    //   token
    // };
  }
}
