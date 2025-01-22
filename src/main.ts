import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const authService = app.get(AuthService);

  const config = new DocumentBuilder()
    .setTitle('jns example')
    .setDescription('JNS API description')
    .setVersion('1.0')
    .addTag('jns')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  await authService.createSuperAdminUser();
  await authService.createRoles();
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
