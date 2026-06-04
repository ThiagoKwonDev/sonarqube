import { NotFoundException } from '@nestjs/common';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: { findById: jest.Mock; updateProfile: jest.Mock };

  beforeEach(() => {
    usersService = {
      findById: jest.fn(),
      updateProfile: jest.fn(),
    };

    usersController = new UsersController(usersService as any);
  });

  it('should return profile without password', async () => {
    usersService.findById.mockResolvedValue({ id: 1, nome: 'Teste', email: 'teste@teste.com', senha: 'senha' });

    const result = await usersController.getProfile({ user: { sub: 1 } });

    expect(result).toEqual({ id: 1, nome: 'Teste', email: 'teste@teste.com' });
  });

  it('should throw NotFoundException when profile is missing', async () => {
    usersService.findById.mockResolvedValue(null);

    await expect(usersController.getProfile({ user: { sub: 1 } })).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should update profile with service result', async () => {
    const updateResult = { message: 'Perfil atualizado com sucesso', user: { id: 1, nome: 'Teste', email: 'teste@teste.com' } };
    usersService.updateProfile.mockResolvedValue(updateResult);

    const result = await usersController.updateProfile({ user: { sub: 1 } }, { nome: 'Teste', email: 'teste@teste.com', senha: '' });

    expect(result).toEqual(updateResult);
    expect(usersService.updateProfile).toHaveBeenCalledWith(1, { nome: 'Teste', email: 'teste@teste.com', senha: '' });
  });
});