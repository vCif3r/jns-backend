import { IsEmail } from "class-validator";

export class CreateSuscripcionDto {
    @IsEmail()
    email: string
}
