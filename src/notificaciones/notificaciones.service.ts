import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Notificacion } from './entities/notificacion.entity';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepository: Repository<Notificacion>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Método para crear una nueva notificación
  async createNotification(userId: number, message: string): Promise<Notificacion> {

    const user = await this.userRepository.findOne({
      where: { id: userId },
    })
    const notification = this.notificacionRepository.create({
      user: user,
      mensaje: message,
    });
    await this.notificacionRepository.save(notification);
    return notification;
  }

  // Método para obtener notificaciones no leídas
  async getUnreadNotifications(userId: number): Promise<Notificacion[]> {
    return this.notificacionRepository.find({
      relations: ['user'],
      where: { user: {id: userId}, leido: false },
    });
  }


  // todas las notificaciones
  async getUserNotifications(userId: any) {
    return this.notificacionRepository.find({
      relations: ['user'],
      where: { user: {id: userId} },
      order: { createdAt: 'DESC' },
      take: 6,
    });
  }

  // Método para marcar una notificación como leída
  async markAsRead(idUser: any) {
    const notifications = await this.notificacionRepository.find({
      where: { user: { id: idUser }, leido: false }, 
      relations: ['user']
    });
    await notifications.forEach((notification) =>{
      notification.leido = true;
      this.notificacionRepository.save(notification);  // Guardar la notificación actualizada
    })
    console.log('notifications actualizadas')
    return;
  }
}
