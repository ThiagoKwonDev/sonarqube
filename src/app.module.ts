import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvisosModule } from './avisos/avisos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PartialCoverageModule } from './partial-coverage/partial-coverage.module';

@Module({
  imports: [AvisosModule, AuthModule, UsersModule, PartialCoverageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
