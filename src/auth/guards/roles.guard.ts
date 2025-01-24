import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // No role required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // Asumiendo que el usuario ya ha sido inyectado en la request por un middleware o guard

    return requiredRoles.some(role => user.role.nombre === role);
  }
}
