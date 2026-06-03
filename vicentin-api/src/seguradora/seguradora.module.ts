import { Module } from '@nestjs/common';
import { SeguradoraService } from './seguradora.service';
import { SeguradoraController } from './seguradora.controller';
import { Seguradora } from './entities/seguradora.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Seguradora])],
  controllers: [SeguradoraController],
  providers: [SeguradoraService],
  exports: [SeguradoraService]
})
export class SeguradoraModule {}
