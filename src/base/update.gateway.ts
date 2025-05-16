import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/ws/update' })
export class UpdateGateway {
    @WebSocketServer()
    server: Server;

    emitUpdate(payload: any) {
        this.server.emit('update', payload);
    }
}
