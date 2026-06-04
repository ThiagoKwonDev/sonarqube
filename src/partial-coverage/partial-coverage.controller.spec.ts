import { PartialCoverageController } from './partial-coverage.controller';
import { PartialCoverageService } from './partial-coverage.service';

describe('PartialCoverageController', () => {
  let controller: PartialCoverageController;

  beforeEach(() => {
    controller = new PartialCoverageController(new PartialCoverageService());
  });

  it('should return covered endpoint result', () => {
    expect(controller.covered()).toEqual({ message: 'covered method result' });
  });
});
