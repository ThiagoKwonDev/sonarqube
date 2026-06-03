import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Servico } from './entities/servico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(Servico)
    private readonly servicoRespository: Repository<Servico>,
  ) {}
  create(createServicoDto: CreateServicoDto) {
    return 'This action adds a new servico';
  }

  async findAll(): Promise<Servico[]> {
    const res = await this.servicoRespository.find();

    if (!res) {
      throw new NotFoundException('Algo deu errado ao bucar os serviços!');
    }

    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} servico`;
  }

  update(id: number, updateServicoDto: UpdateServicoDto) {
    return `This action updates a #${id} servico`;
  }

  remove(id: number) {
    return `This action removes a #${id} servico`;
  }

  testeErro() {
    throw new NotFoundException('Testando pipeline SonarQube!');
  }
}
