import { PartialType } from '@nestjs/mapped-types';
import { CreateAbogadoDto } from './create-abogado.dto';

export class UpdateAbogadoDto extends PartialType(CreateAbogadoDto) {}
