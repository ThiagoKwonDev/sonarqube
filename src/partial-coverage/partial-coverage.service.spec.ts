import { PartialCoverageService } from './partial-coverage.service';

describe('PartialCoverageService', () => {
  let service: PartialCoverageService;

  beforeEach(() => {
    service = new PartialCoverageService();
  });

  it('should return covered message', () => {
    expect(service.getCoveredMessage()).toBe('covered method result');
  });
});
