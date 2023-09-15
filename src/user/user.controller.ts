import { Controller, HttpCode, Post,Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
// import { HttpExceptionFilter } from '../http-filter-exception';
import { createUser, createUserDto, userLogin } from './user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/user/:id')
  @HttpCode(201)
  @ApiTags('User')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update User' })
  @ApiBody({ type: createUser })
  @ApiParam({ name: 'id' })
  async updateUser(
    @Param('id') id: string,
    @Body() body: createUserDto,
  ) {
    return this.userService.updateUser(id, body)
  }


  @Delete('/:id')
  @HttpCode(200)
  @ApiTags('User')
  @ApiBearerAuth()
  @ApiOperation({summary:'Delete User'})
  @ApiParam({name:'userId'})
  async delete(
    @Param('userId') id :string
  ){
    return this.userService.delete(id)
  }

  }



