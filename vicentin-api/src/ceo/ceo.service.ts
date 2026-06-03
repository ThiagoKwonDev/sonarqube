import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCeoDto } from './dto/create-ceo.dto';
import { UpdateCeoDto } from './dto/update-ceo.dto';
import { Ceo } from './entities/ceo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CeoService {
  constructor(
    @InjectRepository(Ceo) private readonly ceoRepository: Repository<Ceo>,
  ) {}

  create(createCeoDto: CreateCeoDto) {
    return 'This action adds a new ceo';
  }

  async findAll(): Promise<Ceo[]> {
    const res = await this.ceoRepository.find();

    if (!res) {
      throw new NotFoundException('Algo deu errado ao buscar o ceo!');
    }
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} ceo`;
  }

  update(id: number, updateCeoDto: UpdateCeoDto) {
    return `This action updates a #${id} ceo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ceo`;
  }
}
