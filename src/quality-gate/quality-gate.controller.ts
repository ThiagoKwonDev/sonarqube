import { Controller, Get, Query } from '@nestjs/common';
import { QualityGateService } from './quality-gate.service';

@Controller('quality-gate')
export class QualityGateController {
  constructor(private readonly qualityGateService: QualityGateService) {}

  @Get()
  check(): { status: string } {
    return { status: this.qualityGateService.getStatus() };
  }

  @Get('metric')
  metric(@Query('value') value = '1'): { value: number } {
    const numericValue = Number(value);
    return { value: this.qualityGateService.calculateMetric(numericValue) };
  }
}
