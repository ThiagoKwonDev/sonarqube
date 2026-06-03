import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: '82u348834rhugrbrhbghfuejfhj', // 🔒 defina aqui sua chave secreta
      signOptions: {
        expiresIn: '1h', // ⏱ tempo de expiração (ex: '1h', '2d', 3600)
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
