import { NotFoundException } from '@nestjs/common';
import { AvisosService } from './avisos.service';
import { pool } from '../config/database.config';

jest.mock('../config/database.config', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('AvisosService', () => {
  let service: AvisosService;
  const queryMock = pool.query as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AvisosService();
  });

  it('should return all avisos without filters', async () => {
    queryMock.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    const result = await service.findAll({});

    expect(result).toEqual([{ id: 1 }]);
    expect(queryMock).toHaveBeenCalledWith('SELECT * FROM avisos ', []);
  });

  it('should build query with categories and locals filters', async () => {
    queryMock.mockResolvedValueOnce({ rows: [{ id: 2 }] });

    const result = await service.findAll({ categorias: 'Alerta,RU', locais: 'Bloco A' });

    expect(result).toEqual([{ id: 2 }]);
    expect(queryMock).toHaveBeenCalledWith(
      'SELECT * FROM avisos WHERE LOWER(tipo) = ANY($1) AND LOWER(local) = ANY($2)',
      [['alerta', 'ru'], ['bloco a']],
    );
  });

  it('should create a new aviso', async () => {
    const createDto = {
      tipo: 'Alerta',
      titulo: 'Título',
      descricao: 'Descrição',
      local: 'Bloco A',
    };
    queryMock.mockResolvedValueOnce({ rows: [{ id: 5, ...createDto, tempo: 'Agora mesmo', curtidas: 0, autor_id: 1 }] });

    const result = await service.create(createDto as any, 1);

    expect(result).toEqual({ id: 5, ...createDto, tempo: 'Agora mesmo', curtidas: 0, autor_id: 1 });
    expect(queryMock).toHaveBeenCalled();
  });

  it('should increment curtidas for an existing aviso', async () => {
    queryMock.mockResolvedValueOnce({ rows: [{ id: 1, curtidas: 1 }] });

    const result = await service.curtir(1);

    expect(result).toEqual({ id: 1, curtidas: 1 });
  });

  it('should throw NotFoundException when curtindo aviso não existente', async () => {
    queryMock.mockResolvedValueOnce({ rows: [] });

    await expect(service.curtir(999)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should return an aviso by id', async () => {
    queryMock.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    const result = await service.findOne(1);

    expect(result).toEqual({ id: 1 });
  });

  it('should throw NotFoundException when aviso not found by id', async () => {
    queryMock.mockResolvedValueOnce({ rows: [] });

    await expect(service.findOne(999)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should update an existing aviso', async () => {
    const updateDto = {
      tipo: 'Alerta',
      titulo: 'Título Atualizado',
      descricao: 'Descrição Atualizada',
      local: 'Bloco B',
    };
    queryMock.mockResolvedValueOnce({ rows: [{ id: 1, ...updateDto, autor_id: 1 }] });

    const result = await service.update(1, updateDto as any, 1);

    expect(result).toEqual({ id: 1, ...updateDto, autor_id: 1 });
  });

  it('should throw NotFoundException when update fails', async () => {
    queryMock.mockResolvedValueOnce({ rows: [] });

    await expect(service.update(999, { tipo: 'x', titulo: 'x', descricao: 'x', local: 'x' } as any, 1)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should remove an existing aviso', async () => {
    queryMock.mockResolvedValueOnce({ rows: [{ id: 1, autor_id: 1 }] });

    const result = await service.remove(1, 1);

    expect(result).toEqual({ id: 1, autor_id: 1 });
  });

  it('should throw NotFoundException when remove fails', async () => {
    queryMock.mockResolvedValueOnce({ rows: [] });

    await expect(service.remove(999, 1)).rejects.toBeInstanceOf(NotFoundException);
  });
});
