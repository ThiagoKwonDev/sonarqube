import { NotFoundException } from '@nestjs/common';
import { SobreNosService } from './sobre-nos.service';

describe('SobreNosService', () => {
  let service: SobreNosService;
  const mockRepository = {
    find: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new SobreNosService(mockRepository);
  });

  it('deve retornar todos os sobre nós', async () => {
    const items = [{ id: 1, titulo: 'Sobre nós' }];
    mockRepository.find.mockResolvedValue(items);

    expect(await service.findAll()).toEqual(items);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('deve lançar NotFoundException quando findAll retornar null', async () => {
    mockRepository.find.mockResolvedValue(null);

    await expect(service.findAll()).rejects.toThrow(NotFoundException);
  });

  it('deve retornar a string esperada em findOne', () => {
    expect(service.findOne(3)).toBe('This action returns a #3 sobreNo');
  });

  it('deve lançar erro intencional', () => {
    expect(() => service.erroIntencional()).toThrow(
      'Erro intencional para teste do QUALITYGATE',
    );
  });
});
