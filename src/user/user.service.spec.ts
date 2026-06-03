import { UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const mockRepository = {
    save: jest.fn(),
    findOneBy: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UserService(mockRepository);
  });

  it('deve criar um usuário quando não existir usuário duplicado', async () => {
    const savedUser = { id: 1, username: 'teste', password: 'hashed' };

    mockRepository.findOneBy.mockResolvedValue(null);
    mockRepository.save.mockResolvedValue(savedUser);

    const result = await service.create('teste', 'senha');

    expect(mockRepository.findOneBy).toHaveBeenCalledWith({
      username: 'teste',
    });
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
    expect(result).toEqual(savedUser);
  });

  it('deve lançar UnauthorizedException quando usuário já existir', async () => {
    mockRepository.findOneBy.mockResolvedValue({ id: 1, username: 'teste' });

    await expect(service.create('teste', 'senha')).rejects.toThrow(
      UnauthorizedException,
    );
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('deve chamar findOneBy no findByUserName', async () => {
    const user = { id: 1, username: 'teste' };
    mockRepository.findOneBy.mockResolvedValue(user);

    const result = await service.findByUserName('teste');

    expect(mockRepository.findOneBy).toHaveBeenCalledWith({
      username: 'teste',
    });
    expect(result).toEqual(user);
  });
});
