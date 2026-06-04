import { Module } from '@nestjs/common';
import { AvisosService } from './avisos.service';
import { AvisosController } from './avisos.controller';

@Module({
  providers: [AvisosService],
  controllers: [AvisosController]
})
export class AvisosModule {}
