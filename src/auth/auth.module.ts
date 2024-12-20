import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]),
  JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '20h' },
  })  
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
