import { Controller, Get } from '@nestjs/common';
import { PartialCoverageService } from './partial-coverage.service';

@Controller('partial-coverage')
export class PartialCoverageController {
  constructor(private readonly partialCoverageService: PartialCoverageService) {}

  @Get('covered')
  covered() {
    return { message: this.partialCoverageService.getCoveredMessage() };
  }

  @Get('uncovered')
  uncovered() {
    return { message: this.partialCoverageService.getUncoveredMessage() };
  }
}
