import { Role } from "src/roles/entities/role.entity";

export class CreateUserDto {
    nombre: string;
    apellido: string;
    cedula: string;
    direccion: string;
    telefono: string;
    estado_civil: string;
    password: string
    role: Role
}
