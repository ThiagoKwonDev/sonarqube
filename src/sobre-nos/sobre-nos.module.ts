import { Module } from '@nestjs/common';
import { SobreNosService } from './sobre-nos.service';
import { SobreNosController } from './sobre-nos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SobreNos } from './entities/sobre-nos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SobreNos])],
  controllers: [SobreNosController],
  providers: [SobreNosService],
})
export class SobreNosModule {}
