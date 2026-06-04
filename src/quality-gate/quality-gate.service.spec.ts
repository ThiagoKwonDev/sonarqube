import { QualityGateService } from './quality-gate.service';

describe('QualityGateService', () => {
  let service: QualityGateService;

  beforeEach(() => {
    service = new QualityGateService();
  });

  it('deve retornar status esperado', () => {
    expect(service.getStatus()).toBe('Quality gate passed');
  });

  it('deve calcular metric corretamente', () => {
    expect(service.calculateMetric(2)).toBe(5);
    expect(service.calculateMetric(0)).toBe(1);
  });
});
