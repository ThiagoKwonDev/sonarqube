import { Injectable } from '@nestjs/common';

@Injectable()
export class PartialCoverageService {
  getCoveredMessage(): string {
    return 'covered method result';
  }

  getUncoveredMessage(): string {
    return 'uncovered method result';
  }
}
