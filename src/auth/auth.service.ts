import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpTime: number;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpTime = +this.configService.get<number>('JWT_EXPIRATION_TIME')!;
  }
  public async login(username: string, password: string): Promise<AuthDto> {
    const user = await this.userService.findByUserName(username);

    if (!user || !compareSync(password, user.password)) {
      throw new UnauthorizedException('Nome ou senha inválido(s)!');
    }

    const payload = { id: user.id, username: user.username };

    const token = this.jwtService.sign(payload);

    return new AuthDto(token, this.jwtExpTime);
  }
}
