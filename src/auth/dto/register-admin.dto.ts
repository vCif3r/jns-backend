import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty } from 'class-validator';

export class RegisterAdminDto extends PartialType(LoginAuthDto) {
    @IsNotEmpty()
    nombre: string
    @IsNotEmpty()
    apellido: string
    @IsNotEmpty()
    cedula: string
    @IsNotEmpty()
    telefono: string
}
