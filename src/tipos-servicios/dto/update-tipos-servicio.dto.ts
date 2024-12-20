import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposServicioDto } from './create-tipos-servicio.dto';

export class UpdateTiposServicioDto extends PartialType(CreateTiposServicioDto) {}
