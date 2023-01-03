import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/role.enum';

export class CreateAuthDto {
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' }) // this will give the schema to the swagger api
  email: string;

  @IsString()
  @ApiProperty({ description: 'role' }) // this will give the schema to the swagger api
  role: Role = Role.USER;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty({ type: String, description: 'Password' }) // this will give the schema to the swagger api
  password: string;
}

export class CreateAuthSignInDto {
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' }) // this will give the schema to the swagger api
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty({ type: String, description: 'Password' }) // this will give the schema to the swagger api
  password: string;
}

export class ResetAuthPasswordDto {
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' }) // this will give the schema to the swagger api
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  @ApiProperty({ type: String, description: 'code' }) // this will give the schema to the swagger api
  code: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty({ type: String, description: 'Password' }) // this will give the schema to the swagger api
  newPassword: string;
}

export class ConfirmCustomerAccount {
  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  conformation: string;
}
