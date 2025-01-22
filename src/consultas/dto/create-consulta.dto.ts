import { IsNotEmpty } from "class-validator";
import { Servicio } from "src/servicios/entities/servicio.entity";
export class CreateConsultaDto {
    @IsNotEmpty()
    demandante: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    detalles: string;
    @IsNotEmpty()
    servicio: Servicio;
    @IsNotEmpty()
    fechaHora: Date;
    @IsNotEmpty()
    hechos: string;
}
