import { IsNotEmpty } from "class-validator";
import { TiposServicio } from "src/tipos-servicios/entities/tipos-servicio.entity";

export class CreateConsultaDto {
    @IsNotEmpty()
    demandante: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    detalles: string;
    @IsNotEmpty()
    tipoServicio: TiposServicio;
    @IsNotEmpty()
    fecha: Date;
    @IsNotEmpty()
    hora: string;
    @IsNotEmpty()
    hechos: string;
}
