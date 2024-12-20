import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateClienteDto {
    nombre: string;
    apellido: string;
    telefono: string;
    direccion: string;
    tipo_cliente: string;
    fecha_nacimiento: string;
}
