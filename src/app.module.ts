import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { PrismaService } from './prisma.service';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [ChatModule,UserModule, AuthModule],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService,PrismaService, AuthService],
})
export class AppModule {}
