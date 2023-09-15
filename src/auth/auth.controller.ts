import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createUser, userLogin } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { verify } from 'crypto';
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
        ) {}

    //   @UseFilters(new HttpExceptionFilter())
  @Post('create')
  @HttpCode(200)
  @ApiTags('User Auth')
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({
    description: 'Create new user',
    type: createUser,
  })
  async registerUser(@Body() dto: createUser) {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiTags('User Auth')
  @ApiOperation({summary:'login user'})
  @ApiBody({
    description:'user login',
    type:userLogin
  })
  async(@Body() dto:userLogin){
    return this.authService.loginUser(dto.email,dto.password)
  }

  @Get('verify')
  @HttpCode(201)
  @ApiBearerAuth()
  @ApiTags('User Auth')
  @ApiOperation({summary:'verify user'})
  async verify(@Req() req){
    console.log(req)
    return this.authService.verify(req)
  }
}
