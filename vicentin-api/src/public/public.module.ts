import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { SeguradoraService } from 'src/seguradora/seguradora.service';
import { EquipeService } from 'src/equipe/equipe.service';

@Module({
  controllers: [PublicController],
  providers: [SeguradoraService, EquipeService],
})
export class PublicModule {}
