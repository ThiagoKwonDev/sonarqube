import { NotFoundException } from '@nestjs/common';
import { CeoService } from './ceo.service';

describe('CeoService', () => {
  let service: CeoService;
  const mockRepository = {
    find: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CeoService(mockRepository);
  });

  it('deve retornar todos os ceos', async () => {
    const ceos = [{ id: 1, nome: 'Ceo Teste' }];
    mockRepository.find.mockResolvedValue(ceos);

    expect(await service.findAll()).toEqual(ceos);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('deve lançar NotFoundException quando findAll retornar null', async () => {
    mockRepository.find.mockResolvedValue(null);

    await expect(service.findAll()).rejects.toThrow(NotFoundException);
  });

  it('deve retornar a string esperada em findOne', () => {
    expect(service.findOne(5)).toBe('This action returns a #5 ceo');
  });
});
