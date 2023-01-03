import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../decorators/get.user.decorator';
import { Roles } from '../decorators/roles.decorator';
import {
  CreateAuthDto, CreateAuthSignInDto, ResetAuthPasswordDto, ResetPasswordDto,
} from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { Auth } from '../entities/auth.entity';
import { Role } from '../entities/role.enum';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async registerAccount(@Body() user: CreateAuthDto): Promise<Auth> {
    const result = await this.authService.registerAccount(user);
    return result;
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: CreateAuthSignInDto): Promise<any> {
    return await this.authService.login(user);
  }

  // @UseGuards(JwtGuard)
  // // @Roles(Role.USER, Role.ADMIN)
  // @Get('user')
  // async getAdmin(@GetUser() user) {
  //   return await this.authService.findUserById(user._id);
  // }

  // @Get()
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  // async getAllUsers(): Promise<Auth[]> {
  //   return await this.authService.findAllUsers();
  // }

  // @Get(':id')
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  // async getUserById(@Param('id') id: string): Promise<Auth> {
  //   return await this.authService.findUserById(id);
  // }

  // @Post('register')
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  // async register(@Body() user: CreateAuthDto): Promise<Auth> {
  //   return await this.authService.registerUser(user);
  // }

  // @Put(':id/update')
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  // async update(
  //   @Param('id') id: string,
  //   @Body() user: UpdateAuthDto,
  // ): Promise<Auth> {
  //   return await this.authService.updateUser(id, user);
  // }

  // @Delete(':id')
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  // async delete(@Param('id') id: string): Promise<Auth> {
  //   return await this.authService.deleteUser(id);
  // }

  //update/change password
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
  async UpdatePassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<any> {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  /********* Email Verification ************
  @Post('/confirm')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  async confirm(
    @GetUser() customer: Auth,
    @Body() confirmCustomerAccount: ConfirmCustomerAccount,
  ): Promise<Auth> {
    return await this.authService.CustomerConfirm(
      confirmCustomerAccount,
      customer,
    );
  }***/
}
