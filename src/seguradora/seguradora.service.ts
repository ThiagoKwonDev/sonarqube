import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeguradoraDto } from './dto/create-seguradora.dto';
import { UpdateSeguradoraDto } from './dto/update-seguradora.dto';
import { Seguradora } from './entities/seguradora.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeguradoraService {
  constructor(
    @InjectRepository(Seguradora)
    private readonly seguradoraRepository: Repository<Seguradora>,
  ) {}

  create(createSeguradoraDto: CreateSeguradoraDto, file: Express.Multer.File) {
    const seguradora = this.seguradoraRepository.create({
      ...createSeguradoraDto,
      src_img: file.mimetype ?? null,
      img_blob: file?.buffer ?? null,
    });
    return this.seguradoraRepository.save(seguradora);
  }

  async findAll(): Promise<Seguradora[]> {
    const seguradoras = await this.seguradoraRepository.find();
    if (!seguradoras) {
      throw new NotFoundException(`Nenhuma seguradora encontrada.`);
    }
    return seguradoras.map((s) => {
      if (s.img_blob) {
        s.imagemBase64 = `data:${s.src_img};base64,${s.img_blob.toString('base64')}`;
      }
      return s;
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} seguradora`;
  }

  async update(
    id: number,
    updateSeguradoraDto: UpdateSeguradoraDto,
    file?: Express.Multer.File,
  ) {
    const seguradora = await this.seguradoraRepository.findOne({
      where: { id },
    });

    if (!seguradora) {
      throw new NotFoundException(`Seguradora com id ${id} não encontrada`);
    }
    Object.assign(seguradora, updateSeguradoraDto);
    if (file) {
      seguradora.src_img = file.mimetype;
      seguradora.img_blob = file.buffer;
    }
    const saved = await this.seguradoraRepository.save(seguradora);
    return {
      ...saved,
      imagemBase64: saved.img_blob
        ? `data:${saved.src_img};base64,${saved.img_blob.toString('base64')}`
        : null,
    };
  }

  async remove(id: number) {
    if (id != null) {
      return await this.seguradoraRepository.delete(id);
    }
    return null;
  }
}
