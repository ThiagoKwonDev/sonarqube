import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ContatoService } from './contato.service';

describe('ContatoService', () => {
  let service: ContatoService;
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ContatoService(mockRepository);
  });

  it('deve criar contato com sucesso', async () => {
    const dto = { nome: 'Teste', email: 'test@vicentin.com' };
    const contato = { id: 1, ...dto };

    mockRepository.create.mockReturnValue(dto);
    mockRepository.save.mockResolvedValue(contato);

    const result = await service.create(dto);

    expect(mockRepository.create).toHaveBeenCalledWith(dto);
    expect(mockRepository.save).toHaveBeenCalledWith(dto);
    expect(result).toEqual(contato);
  });

  it('deve lançar InternalServerErrorException se salvar falhar', async () => {
    const dto = { nome: 'Teste', email: 'test@vicentin.com' };

    mockRepository.create.mockReturnValue(dto);
    mockRepository.save.mockRejectedValue(new Error('DB error'));

    await expect(service.create(dto)).rejects.toThrow(InternalServerErrorException);
  });

  it('deve retornar todos os contatos', async () => {
    const contatos = [{ id: 1, nome: 'Teste' }];
    mockRepository.find.mockResolvedValue(contatos);

    expect(await service.findAll()).toEqual(contatos);
    expect(mockRepository.find).toHaveBeenCalledWith({ order: { id: 'ASC' } });
  });

  it('deve lançar NotFoundException quando contato não existir', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('deve atualizar contato existente', async () => {
    const existing = { id: 1, nome: 'Teste' };
    const dto = { nome: 'Teste atualizado' };
    const merged = { id: 1, nome: 'Teste atualizado' };

    mockRepository.findOne.mockResolvedValue(existing);
    mockRepository.merge.mockReturnValue(merged);
    mockRepository.save.mockResolvedValue(merged);

    const result = await service.update(1, dto);

    expect(mockRepository.merge).toHaveBeenCalledWith(existing, dto);
    expect(result).toEqual(merged);
  });

  it('deve remover contato existente', async () => {
    const contato = { id: 1, nome: 'Teste' };
    mockRepository.findOne.mockResolvedValue(contato);
    mockRepository.remove.mockResolvedValue(contato);

    const result = await service.remove(1);

    expect(mockRepository.remove).toHaveBeenCalledWith(contato);
    expect(result).toBe(true);
  });
});
