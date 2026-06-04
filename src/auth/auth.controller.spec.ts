import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: { login: jest.Mock; register: jest.Mock };

  beforeEach(() => {
    authService = {
      login: jest.fn().mockResolvedValue({ token: 'token-123', user: { id: 1, email: 'teste@teste.com' } }),
      register: jest.fn().mockResolvedValue({ token: 'token-456', user: { id: 2, email: 'novo@teste.com' } }),
    };

    authController = new AuthController(authService as any);
  });

  it('should call login on AuthService', async () => {
    const loginDto = { email: 'teste@teste.com', senha: 'senha' };
    const result = await authController.login(loginDto);

    expect(authService.login).toHaveBeenCalledWith(loginDto);
    expect(result).toEqual({ token: 'token-123', user: { id: 1, email: 'teste@teste.com' } });
  });

  it('should call register on AuthService', async () => {
    const registerDto = { nome: 'Novo', email: 'novo@teste.com', senha: 'senha' };
    const result = await authController.register(registerDto);

    expect(authService.register).toHaveBeenCalledWith(registerDto);
    expect(result).toEqual({ token: 'token-456', user: { id: 2, email: 'novo@teste.com' } });
  });
});