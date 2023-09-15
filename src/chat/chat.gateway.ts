import { MessageBody, OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { messageDto } from './message.dto';

 @WebSocketGateway({
  transports:['websocket']
 })
export class ChatGateway implements OnGatewayInit{
  private logger: Logger = new Logger('ChatGateway');
  constructor(private db: PrismaService, private chatService: ChatService) { }

  @WebSocketServer()
  server:Server

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client:Socket){
    client.join(client.handshake.headers.room)
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }

//  send to all client that joined socket

  @SubscribeMessage('receiveMessage')
  sendMessage(client:Socket,@MessageBody() data:{
    message:string,
    sender:string,
    receiver:string
  }){
    this.server.emit('receiveMessage')
    return this.chatService.sendMessage({message:'hello',sender:'bd2bc5e8-c618-4273-af80-4bfaad7148d0',receiver:'d0119298-85aa-4f1e-889b-dced84e1313c'})
    //return this.chatService.sendMessage(data)

  }

  // send to the member who joined room

  @SubscribeMessage('roomMessage')
  async sendMessageToSelectedUser(client:Socket,@MessageBody()data:{
    message:string,
    sender:string,
    receiver:string
  }){
    this.server.to('testRoom').emit('roomMessage',data)
    console.log("ok")
    return this.chatService.sendMessage({message:'hello testing123',sender:'bd2bc5e8-c618-4273-af80-4bfaad7148d0',receiver:'d0119298-85aa-4f1e-889b-dced84e1313c'})
    // return this.chatService.sendMessage(data)

  }

  handleDisconnect(client:Socket){
    this.logger.debug('listen disconnect',client.id)
  }


}
