import { Module } from '@nestjs/common';
import { CeoService } from './ceo.service';
import { CeoController } from './ceo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ceo } from './entities/ceo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ceo])],
  controllers: [CeoController],
  providers: [CeoService],
})
export class CeoModule {}
