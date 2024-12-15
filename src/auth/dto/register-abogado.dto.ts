import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty } from 'class-validator';

export class RegisterAbogadoDto extends PartialType(LoginAuthDto) {
    @IsNotEmpty()
    nombre: string
    @IsNotEmpty()
    apellido: string
    @IsNotEmpty()
    cedula: string
    @IsNotEmpty()
    direccion: string
    @IsNotEmpty()
    telefono: string
    @IsNotEmpty()
    pais: string
    @IsNotEmpty()
    especialidad: string
    @IsNotEmpty()
    genero: string
}
