import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificacionesService } from './notificaciones.service';

@WebSocketGateway(3001,{ cors: { origin: '*' } })
export class NotificationsGateway  {
  
  
}
