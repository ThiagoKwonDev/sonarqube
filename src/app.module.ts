import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeguradoraModule } from './seguradora/seguradora.module';
import { EquipeModule } from './equipe/equipe.module';
import { ContatoModule } from './contato/contato.module';
import { CeoModule } from './ceo/ceo.module';
import { UserModule } from './user/user.module';
import { SobreNosModule } from './sobre-nos/sobre-nos.module';
import { ServicoModule } from './servico/servico.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PublicController } from './public/public.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
      }),
    }),
    SeguradoraModule,
    EquipeModule,
    ContatoModule,
    CeoModule,
    UserModule,
    SobreNosModule,
    ServicoModule,
    AuthModule,
  ],
  controllers: [PublicController],
})
export class AppModule {}
