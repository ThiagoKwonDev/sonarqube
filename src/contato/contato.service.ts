import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contato } from './entities/contato.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContatoService {
  constructor(
    @InjectRepository(Contato)
    private readonly contatoRepository: Repository<Contato>,
  ) {}

  async create(createContatoDto: CreateContatoDto): Promise<Contato> {
    try {
      const novoContato = this.contatoRepository.create(createContatoDto);
      return await this.contatoRepository.save(novoContato);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o contato no banco de dados.',
      );
    }
  }

  async findAll(): Promise<Contato[]> {
    const res = await this.contatoRepository.find({
      order: { id: 'ASC' },
    });

    if (!res) {
      throw new NotFoundException('Algo deu errado ao buscar os contatos!');
    }
    return res;
  }

  async findOne(id: number): Promise<Contato> {
    const contato = await this.contatoRepository.findOne({ where: { id } });

    if (!contato) {
      throw new NotFoundException(`Contato com ID ${id} não encontrado!`);
    }
    return contato;
  }

  async update(
    id: number,
    updateContatoDto: UpdateContatoDto,
  ): Promise<Contato> {
    const contato = await this.findOne(id);

    const contatoAtualizado = this.contatoRepository.merge(
      contato,
      updateContatoDto,
    );

    return await this.contatoRepository.save(contatoAtualizado);
  }

  async remove(id: number): Promise<boolean> {
    const contato = await this.findOne(id);
    const resultado = await this.contatoRepository.remove(contato);

    return !!resultado;
  }
}
