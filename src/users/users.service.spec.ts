import { BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { pool } from '../config/database.config';

jest.mock('../config/database.config', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
    (pool.query as jest.Mock).mockReset();
  });

  it('should find a user by email', async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ id: 1, email: 'teste@teste.com' }] });

    const result = await usersService.findByEmail('teste@teste.com');

    expect(result).toEqual({ id: 1, email: 'teste@teste.com' });
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE email = $1', ['teste@teste.com']);
  });

  it('should find a user by id', async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ id: 1, email: 'teste@teste.com' }] });

    const result = await usersService.findById(1);

    expect(result).toEqual({ id: 1, email: 'teste@teste.com' });
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE id = $1', [1]);
  });

  it('should throw when email already exists on create', async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ id: 1, email: 'teste@teste.com' }] });

    await expect(usersService.create({ nome: 'Teste', email: 'teste@teste.com', senha: 'senha' })).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should create a new user', async () => {
    (pool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [{ id: 2, nome: 'Novo', email: 'novo@teste.com', senha: 'senha' }] });

    const result = await usersService.create({ nome: 'Novo', email: 'novo@teste.com', senha: 'senha' });

    expect(result).toEqual({ id: 2, nome: 'Novo', email: 'novo@teste.com', senha: 'senha' });
  });

  it('should update profile successfully', async () => {
    (pool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [{ id: 1, nome: 'Teste', email: 'teste@teste.com', senha: 'senha' }] })
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [{ id: 1, nome: 'Teste Atualizado', email: 'novo@teste.com', senha: 'senha' }] });

    const result = await usersService.updateProfile(1, { nome: 'Teste Atualizado', email: 'novo@teste.com', senha: '' });

    expect(result).toEqual({ message: 'Perfil atualizado com sucesso', user: { id: 1, nome: 'Teste Atualizado', email: 'novo@teste.com' } });
  });

  it('should throw when updating profile with nonexistent user', async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    await expect(usersService.updateProfile(1, { nome: 'Teste', email: 'teste@teste.com', senha: 'senha' })).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should throw when updating profile to duplicate email', async () => {
    (pool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [{ id: 1, nome: 'Teste', email: 'teste@teste.com', senha: 'senha' }] })
      .mockResolvedValueOnce({ rows: [{ id: 2 }] });

    await expect(usersService.updateProfile(1, { nome: 'Teste', email: 'teste2@teste.com', senha: '' })).rejects.toBeInstanceOf(BadRequestException);
  });
});