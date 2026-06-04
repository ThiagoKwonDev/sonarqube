import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: { findByEmail: jest.Mock; create: jest.Mock };
  let jwtService: { signAsync: jest.Mock };

  beforeEach(() => {
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('token-123'),
    };

    authService = new AuthService(usersService as any, jwtService as any);
  });

  it('should login successfully with valid credentials', async () => {
    usersService.findByEmail.mockResolvedValue({ id: 1, email: 'teste@teste.com', senha: 'senha', nome: 'Teste' });

    const result = await authService.login({ email: 'teste@teste.com', senha: 'senha' });

    expect(result).toEqual({ token: 'token-123', user: { id: 1, email: 'teste@teste.com', nome: 'Teste' } });
    expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: 1, username: 'teste@teste.com' });
  });

  it('should throw UnauthorizedException for invalid credentials', async () => {
    usersService.findByEmail.mockResolvedValue(null);

    await expect(authService.login({ email: 'teste@teste.com', senha: 'senha' })).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should register a new user and return token and user data', async () => {
    usersService.create.mockResolvedValue({ id: 2, email: 'novo@teste.com', senha: 'senha', nome: 'Novo' });

    const result = await authService.register({ nome: 'Novo', email: 'novo@teste.com', senha: 'senha' });

    expect(result).toEqual({ token: 'token-123', user: { id: 2, email: 'novo@teste.com', nome: 'Novo' } });
    expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: 2, username: 'novo@teste.com' });
  });
});