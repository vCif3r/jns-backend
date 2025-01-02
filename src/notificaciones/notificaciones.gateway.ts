import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificacionesService } from './notificaciones.service';

@WebSocketGateway(0, { cors: { origin: '*' } })
export class NotificationsGateway {

  constructor(
    private readonly notificationsService: NotificacionesService,
  ) { }

  @WebSocketServer()
  server: Server;

  private users = new Map<string, number>();

  afterInit(server: Server) {
    console.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected: ${client.id}`);
    this.users.delete(client.id);
  }

  handleConnection(client: Socket) {
    console.log(`Client Connected: ${client.id}`);
    const userId = client.handshake.query.userId;
    if (userId) {
      this.users.set(client.id, parseInt(userId.toString(), 10));

      // Obtener las notificaciones del usuario desde la base de datos
      this.notificationsService.getUserNotifications(userId)
        .then(notifications => {
          // Enviar las notificaciones al cliente que se conectó
          client.emit('notifications', notifications);
        });
    }
  }

  async sendNotificationToUser(userId: number, message: string) {
    // Guardar la notificación en la base de datos
    const notificacion = await this.notificationsService.createNotification(userId, message);

    // Enviar la notificación al cliente conectado (si está conectado)
    for (const [clientId, id] of this.users.entries()) {
      if (id === userId) {
        const client = this.server.sockets.sockets.get(clientId); // Usar sockets.sockets para obtener el cliente
        if (client) {
          client.emit('notification', notificacion);
        }
      }
    }
  }

  @SubscribeMessage('markNotificationsAsRead')
  async handleMarkNotificationsAsRead(client: Socket, userId: any) {
    const validUserId = parseInt(userId, 10);
    await this.notificationsService.markAsRead(validUserId);
    for (const [clientId, id] of this.users.entries()) {
      if (id === validUserId) {
        const clientSocket = this.server.sockets.sockets.get(clientId);
        if (clientSocket) {
          clientSocket.emit('notificationsRead');
        }
      }
    }
  }
}
