import { Servicio } from 'src/servicios/entities/servicio.entity';

export class CreateTiposServicioDto {
    nombre: string;
    descripcion: string;
    servicio: Servicio
}
