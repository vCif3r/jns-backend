import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterClienteDto } from './dto/register-cliente.dto';
import { RegisterAbogadoDto } from './dto/register-abogado.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('register/cliente')
  // registerCliente(@Body() userObject: RegisterClienteDto) {
  //   return this.authService.registerCliente(userObject);
  // }

  // @Post('register/abogado')
  // registerAbogado(@Body() userObject: RegisterAbogadoDto) {
  //   return this.authService.registerAbogado(userObject);
  // }

  // @Post('register/admin')
  // registerAdmin(@Body() userObject: RegisterAbogadoDto) {
  //   return this.authService.registerAdmin(userObject);
  // }

  @Post('login')
  login(@Body() userObject: LoginAuthDto) {
    return this.authService.login(userObject);
  }
}
