import { QualityGateController } from './quality-gate.controller';
import { QualityGateService } from './quality-gate.service';

describe('QualityGateController', () => {
  let controller: QualityGateController;

  beforeEach(() => {
    controller = new QualityGateController(new QualityGateService());
  });

  it('deve retornar status via endpoint', () => {
    expect(controller.check()).toEqual({ status: 'Quality gate passed' });
  });

  it('deve retornar metric via query', () => {
    expect(controller.metric('3')).toEqual({ value: 7 });
  });
});
