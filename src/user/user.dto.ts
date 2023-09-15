import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer'

export class createUserDto{
    email:string
    password:string
    address:string
    name:string
    phone:string
    status?:boolean
}


export class createUser{
    @ApiProperty()
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsNotEmpty()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    password:string

    @ApiProperty()
    @IsNotEmpty()
    address:string

    @ApiProperty()
    @IsNotEmpty()
    phone:string

    @ApiProperty({ type: Boolean })
    @Transform(({ value }) => {
      return value === 'true' || value === '1'
    })
    status?: any
}

export class userLogin{
  @ApiProperty()
  @IsNotEmpty()
  email:string

  @ApiProperty()
  @IsNotEmpty()
  password:string
}


