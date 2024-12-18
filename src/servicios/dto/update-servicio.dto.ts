import { PartialType } from '@nestjs/mapped-types';
import { CreateServicioDto } from './create-servicio.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateServicioDto extends PartialType(CreateServicioDto) {
    @IsBoolean()
    @IsNotEmpty()
    disponible: boolean;  
}
