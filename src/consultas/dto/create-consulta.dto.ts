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
    fechaHora: Date;
    @IsNotEmpty()
    hechos: string;
}
