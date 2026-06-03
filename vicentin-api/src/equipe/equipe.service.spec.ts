import { NotFoundException } from '@nestjs/common';
import { EquipeService } from './equipe.service';

describe('EquipeService', () => {
  let service: EquipeService;
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new EquipeService(mockRepository);
  });

  it('deve criar equipe com dados e arquivo', async () => {
    const dto = { nome: 'Equipe A' };
    const file = { mimetype: 'image/png', buffer: Buffer.from('abc') } as any;
    const created = { id: 1, ...dto, src_img: 'image/png', img_blob: file.buffer };

    mockRepository.create.mockReturnValue(created);
    mockRepository.save.mockResolvedValue(created);

    const result = await service.create(dto as any, file);

    expect(mockRepository.create).toHaveBeenCalledWith({
      ...dto,
      src_img: file.mimetype,
      img_blob: file.buffer,
    });
    expect(result).toEqual(created);
  });

  it('deve retornar equipes com imagemBase64 quando houver blob', async () => {
    const equipes = [
      { id: 1, nome: 'Equipe A', src_img: 'image/png', img_blob: Buffer.from('abc') },
    ];
    mockRepository.find.mockResolvedValue(equipes);

    const result = await service.findAll();

    expect(result[0].imagemBase64).toBe(`data:image/png;base64,${Buffer.from('abc').toString('base64')}`);
  });

  it('deve lançar NotFoundException ao atualizar equipe inexistente', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    await expect(service.update(999, { nome: 'Nova' } as any, { mimetype: 'image/jpeg', buffer: Buffer.from('123') } as any)).rejects.toThrow(NotFoundException);
  });

  it('deve atualizar equipe existente com arquivo', async () => {
    const existing = { id: 1, nome: 'Equipe A', src_img: null, img_blob: null } as any;
    const file = { mimetype: 'image/jpeg', buffer: Buffer.from('123') } as any;
    const saved = { ...existing, src_img: file.mimetype, img_blob: file.buffer };

    mockRepository.findOne.mockResolvedValue(existing);
    mockRepository.save.mockResolvedValue(saved);

    const result = await service.update(1, { nome: 'Atualizada' } as any, file);

    expect(result.imagemBase64).toBe(`data:image/jpeg;base64,${file.buffer.toString('base64')}`);
  });

  it('deve remover equipe quando id for informado', async () => {
    const deleteResult = { affected: 1 };
    mockRepository.delete.mockResolvedValue(deleteResult);

    expect(await service.remove(1)).toEqual(deleteResult);
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });
});
