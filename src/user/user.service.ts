import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userName: string, password: string) {
    const userDuplicado = await this.findByUserName(userName);

    if (userDuplicado != null) {
      throw new UnauthorizedException();
    }
    const newUser = new CreateUserDto();
    newUser.password = hashSync(password, 10);
    newUser.username = userName;
    return this.userRepository.save(newUser);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByUserName(username: string) {
    return await this.userRepository.findOneBy({ username });
  }
}
