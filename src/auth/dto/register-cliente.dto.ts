import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty } from 'class-validator';
import { Pais } from 'src/paises/entities/pais.entity';

export class RegisterClienteDto extends PartialType(LoginAuthDto) {
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
    pais: Pais
    @IsNotEmpty()
    estado_civil: string
    @IsNotEmpty()
    tipo_cliente: string
    @IsNotEmpty()
    genero: string
}
