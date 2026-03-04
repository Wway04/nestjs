import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { UserJwtResponse } from './interfaces/user-jwt.interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUserById(userId: number) {
    return await this.userService.findById(userId);
  }

  async signUp(signupDto: SignupDto): Promise<User> {
    return this.userService.create(signupDto);
  }

  async login(loginDto: LoginDto): Promise<UserJwtResponse> {
    const userResult = await this.userService.signIn(loginDto);

    if (!userResult) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    const payload = { userResult };
    const accessToken = await this.jwtService.sign(payload);

    const signInResponse: UserJwtResponse = { user: userResult, accessToken };

    return signInResponse;
  }
}