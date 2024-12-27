import { IsString } from "class-validator";

export class UpdateCasoDto {
    @IsString()
    estado: string;
}