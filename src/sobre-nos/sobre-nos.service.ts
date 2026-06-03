import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSobreNoDto } from './dto/create-sobre-no.dto';
import { UpdateSobreNoDto } from './dto/update-sobre-no.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SobreNos } from './entities/sobre-nos.entity';

@Injectable()
export class SobreNosService {
  constructor(
    @InjectRepository(SobreNos)
    private readonly sobreNosRepository: Repository<SobreNos>,
  ) {}

  create(createSobreNoDto: CreateSobreNoDto) {
    return 'This action adds a new sobreNo';
  }

  async findAll(): Promise<SobreNos[]> {
    const res = await this.sobreNosRepository.find();

    if (!res) {
      throw new NotFoundException('Algo deu errado ao buscar sobre nós!');
    }

    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} sobreNo`;
  }

  update(id: number, updateSobreNoDto: UpdateSobreNoDto) {
    return `This action updates a #${id} sobreNo`;
  }

  remove(id: number) {
    return `This action removes a #${id} sobreNo`;
  }

  erroIntecional() {
    console.log('EXECUTANDO ERRO INTENCIONAL PARA BARRAR QUALITY GATE...');
    throw new Error('Erro intencional para teste do QUALITYGATE');
  }
}
