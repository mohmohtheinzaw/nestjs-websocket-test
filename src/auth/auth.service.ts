import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createUserDto } from '../user/user.dto';
import { getHashed } from 'src/helper';
import { getToken } from 'src/helper';
import { verifyToken } from 'src/helper';
import { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(
    private db:PrismaService
    ){}

    async registerUser(dto:createUserDto){
        console.log(dto)
        try {
            let res = await this.db.user.create({
                data:{
                   email:dto.email,
                   password:getHashed(dto.password),
                   name :dto.name,
                   phone:dto.phone,
                   address:dto.address,
                   status:dto.status
                }
            })
            return res
        } catch (error) {
            throw error
        }
    }


    async loginUser(email:string,password:string){
        try {
            let user = await this.db.user.findUniqueOrThrow({
                where:{
                    email:email,
                    password:getHashed(password)
                }
            })
            if(!user) return 404
            let token = getToken({id:user.id})
            return {user,token}
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async verify(req){
        try {
            let token = this.extractTokenFromHeader(req)
            let user = verifyToken(token)
            let data = await this.db.user.findUniqueOrThrow({
                where:{id:user.id}
            })
            return data
        } catch (error) {
            throw error
        }
    }

    
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
