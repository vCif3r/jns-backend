import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { JwtModule } from '@nestjs/jwt';
import { Admin } from 'src/admins/entities/admin.entity';
import { Abogado } from 'src/abogados/entities/abogado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente,Admin,Abogado]),
  JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '20h' },
  })  
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
