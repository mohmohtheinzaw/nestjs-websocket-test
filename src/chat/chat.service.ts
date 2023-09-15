import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { messageDto } from './message.dto';
@Injectable()
export class ChatService {
    constructor(private db:PrismaService){}

    async sendMessage(dto:messageDto){
        try {
            let result = await this.db.userMessage.create({
                data:{
                    message:dto.message,
                    senderId:dto.sender,
                    receiverId:dto.receiver
                }
            })
            return result
        } catch (error) {
            throw error
        }
    }

    async deleteMessage(id:string){
        try {
            let res = await this.db.userMessage.delete({
                where:{
                    id
                }
            })
            throw res
        } catch (error) {
            throw error
        }
    }
}
