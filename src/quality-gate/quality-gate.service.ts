import { Injectable } from '@nestjs/common';

@Injectable()
export class QualityGateService {
  getStatus(): string {
    return 'Quality gate passed';
  }

  calculateMetric(value: number): number {
    return value * 2 + 1;
  }
}
