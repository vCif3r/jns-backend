// // src/auth/jwt.strategy.ts
// import { Injectable } from '@nestjs/common';
// import { JwtStrategy as PassportJwtStrategy } from '@nestjs/passport';
// import { PassportSerializer } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthService } from './auth.service';
// import { JwtPayload } from './jwt-payload.interface'; // Definir tu interfaz de payload JWT
// import { User } from '../users/user.entity'; // Suponiendo que tienes una entidad User

// @Injectable()
// export class JwtStrategy extends PassportJwtStrategy {
//   constructor(private authService: AuthService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el JWT desde el encabezado Authorization
//       secretOrKey: 'your-secret-key', // Define tu clave secreta
//     });
//   }

//   // El método validate se ejecuta para verificar el JWT
//   async validate(payload: JwtPayload): Promise<User> {
//     return await this.authService.validateUser(payload); // Verifica al usuario según el payload
//   }
// }
