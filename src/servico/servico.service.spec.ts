import { NotFoundException } from '@nestjs/common';
import { ServicoService } from './servico.service';

describe('ServicoService', () => {
  let service: ServicoService;
  const mockRepository = {
    find: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ServicoService(mockRepository);
  });

  it('deve retornar todos os serviços', async () => {
    const servicos = [{ id: 1, titulo: 'Serviço 1' }];
    mockRepository.find.mockResolvedValue(servicos);

    expect(await service.findAll()).toEqual(servicos);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('deve lançar NotFoundException quando findAll retornar null', async () => {
    mockRepository.find.mockResolvedValue(null);

    await expect(service.findAll()).rejects.toThrow(NotFoundException);
  });

  it('deve retornar a string esperada em findOne', () => {
    expect(service.findOne(10)).toBe('This action returns a #10 servico');
  });
});
