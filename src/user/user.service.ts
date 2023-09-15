import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { createUserDto } from './user.dto';
import { getHashed } from 'src/helper';
import { getToken } from 'src/helper';
@Injectable()
export class UserService {
    constructor(private dbService:PrismaService){ }


    async updateUser(id:string,dto:createUserDto){
        try {
            let result = await this.dbService.user.update({
                data:{
                    email:dto.email,
                    name:dto.name,
                    password:dto.password,
                    address:dto.address,
                    phone:dto.phone,
                    status:dto.status
                },
                where:{
                    id:id
                }
            })
            return result
        } catch (error) {
            throw error
        }
    }

    async delete(userId:string){
        try {
            let result = await this.dbService.user.delete({
                where:{
                    id:userId
                }
            })
        return result
        } catch (error) {
            console.log(error)
        }
    }

    

}
