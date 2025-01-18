import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService implements OnModuleInit {
  // getHello(): string {
  //   return 'Hello World!';
  // }

  constructor(private readonly authService: AuthService) {}
  async onModuleInit() {
    await this.authService.createAdminUser();
  }
}
