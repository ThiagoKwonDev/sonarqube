import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: { verifyAsync: jest.Mock };

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn(),
    };
    guard = new AuthGuard(jwtService as any);
  });

  it('should throw UnauthorizedException when no token is provided', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
      }),
    } as any;

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should throw UnauthorizedException when token is invalid', async () => {
    jwtService.verifyAsync.mockRejectedValue(new Error('invalid'));

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer invalid-token' } }),
      }),
    } as any;

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should attach user to request and return true when token is valid', async () => {
    jwtService.verifyAsync.mockResolvedValue({ sub: 1, username: 'teste@teste.com' });

    const request: any = { headers: { authorization: 'Bearer valid-token' } };
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as any;

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(request.user).toEqual({ sub: 1, username: 'teste@teste.com' });
  });
});
