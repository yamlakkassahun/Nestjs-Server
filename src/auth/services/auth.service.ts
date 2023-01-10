import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '../entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../entities/role.enum';
import {
  ConfirmCustomerAccount,
  CreateAuthDto,
  CreateAuthSignInDto,
  ResetAuthPasswordDto,
  ResetPasswordDto,
} from '../dto/create-auth.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { AuthRepository } from '../repositories/auth.Repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly AuthModel: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async doesUserExist(email: string): Promise<any> {
    const user: Auth = await this.AuthModel.findOne({ email });
    if (user) {
      return true;
    }
    return false;
  }

  async registerAccount(user: CreateAuthDto): Promise<Auth> {
    const { email, password, role } = user;
    const userExist: boolean = await this.doesUserExist(email);

    if (userExist) {
      throw new HttpException(
        'A user has already been created with this email address',
        HttpStatus.BAD_REQUEST,
      );
    }

    //assigning Role
    let userRole = Role.USER;
    if (role === 'admin') {
      userRole = Role.ADMIN;
    } else if (role === 'super') {
      userRole = Role.SUPER;
    }

    //hashing the password
    const hashedPassword = await this.hashPassword(password);

    //registering the new user and returning it
    return this.AuthModel.create({
      email,
      role: userRole,
      password: hashedPassword,
    });
  }

  async validateUser(email: string, password: string): Promise<Auth> {
    const existingUser: Auth = await this.AuthModel.findOne({ email });
    //check if the user exist
    if (!existingUser) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
        HttpStatus.FORBIDDEN,
      );
    }

    //check the users password
    if (!(await bcrypt.compare(password, existingUser.password))) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
        HttpStatus.FORBIDDEN,
      );
    }

    return existingUser;
  }

  async login(userCredentials: CreateAuthSignInDto): Promise<any> {
    const { email, password } = userCredentials;
    const user = await this.validateUser(email, password);

    if (user) {
      // create JWT - credentials
      const token = await this.jwtService.signAsync({ user });
      return { user: user, accessToken: token };
    }
  }

  //password update
  async ChangePassword(
    user: any,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Auth> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const existingUser = await this.AuthModel.findOne({ id: user._id });
    //check if the old password is correct
    if (!existingUser && bcrypt.compare(oldPassword, existingUser.password)) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'User Was Not Found' },
        HttpStatus.FORBIDDEN,
      );
    }

    //hashing the password
    const hashedPassword = await this.hashPassword(newPassword);

    existingUser.password = hashedPassword;
    await existingUser.save();
    return existingUser;
  }

  async deleteUser(id: string): Promise<Auth> {
    return await this.AuthModel.deleteOne({ id });
  }

  /**************Password Reset*************/
  async checkUser(resetAuthPasswordDto: ResetAuthPasswordDto): Promise<Auth> {
    const { email } = resetAuthPasswordDto;
    const user = await this.AuthModel.findOne({ email });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `User With This ${email} Not Found`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    user.code = Math.random().toString(36).substring(2, 15);
    await user.save();
    return user;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<Auth> {
    const { code, newPassword } = resetPasswordDto;

    const user = await this.AuthModel.findOne({ code });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `User Not Found`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    //hashing the password
    const hashedPassword = await this.hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();
    return user;
  }

  /************* Customer Email Verification *************/
  async CustomerConfirm(
    confirmCustomerAccount: ConfirmCustomerAccount,
    customer: Auth,
  ): Promise<Auth> {
    const { conformation } = confirmCustomerAccount;
    const { email, code } = customer;

    if (code !== conformation) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `Conformation Code Is Not Valid`,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.AuthModel.findOne({ email: email });
    user.verified = true;
    await user.save();
    return user;
  }
}
