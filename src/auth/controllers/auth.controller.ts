import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../decorators/get.user.decorator';
import { Roles } from '../decorators/roles.decorator';
import {
  CreateAuthDto,
  CreateAuthSignInDto,
  ResetAuthPasswordDto,
  ResetPasswordDto,
} from '../dto/create-auth.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { Auth } from '../entities/auth.entity';
import { Role } from '../entities/role.enum';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async registerAccount(@Body() user: CreateAuthDto): Promise<Auth> {
    const result = await this.authService.registerAccount(user);
    return result;
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: CreateAuthSignInDto): Promise<any> {
    return await this.authService.login(user);
  }

  /************ change password **************/

  @Post('change-password')
  @UseGuards(JwtGuard)
  async ChangePassword(
    @GetUser() user: any,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.authService.ChangePassword(user, updatePasswordDto);
  }

  /*********** password reset *****************/

  @Post('reset')
  async ResetPassword(
    @Body() resetAuthPasswordDto: ResetAuthPasswordDto,
  ): Promise<any> {
    const user = await this.authService.checkUser(resetAuthPasswordDto);
    return user;
  }

  @Post('reset-password')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.SUPER)
  async UpdatePassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<any> {
    return await this.authService.resetPassword(resetPasswordDto);
  }
}
