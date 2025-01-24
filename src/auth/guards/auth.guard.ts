import { Injectable } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';  // Usa el AuthGuard de Passport

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {}  // Asegúrate de que se está usando la estrategia "jwt"
