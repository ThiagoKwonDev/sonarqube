import { Module } from '@nestjs/common';
import { PartialCoverageController } from './partial-coverage.controller';
import { PartialCoverageService } from './partial-coverage.service';

@Module({
  controllers: [PartialCoverageController],
  providers: [PartialCoverageService],
})
export class PartialCoverageModule {}
