import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const { email, senha } = loginDto;
    const user = await this.usersService.findByEmail(email);

    if (user && user.senha === senha) {
      const payload = { sub: user.id, username: user.email };
      const { senha, ...result } = user;
      return {
        token: await this.jwtService.signAsync(payload),
        user: result,
      };
    }

    throw new UnauthorizedException('Credenciais inválidas');
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    const payload = { sub: user.id, username: user.email };
    const { senha, ...result } = user;
    return {
      token: await this.jwtService.signAsync(payload),
      user: result,
    };
  }
}
