import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { Equipe } from './entities/equipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EquipeService {
  constructor(
    @InjectRepository(Equipe)
    private readonly equipeRepository: Repository<Equipe>,
  ) {}

  create(createEquipeDto: CreateEquipeDto, file: Express.Multer.File) {
    const equipe = this.equipeRepository.create({
      ...createEquipeDto,
      src_img: file.mimetype ?? null,
      img_blob: file?.buffer ?? null,
    });
    return this.equipeRepository.save(equipe);
  }

  async findAll(): Promise<Equipe[]> {
    const equipes = await this.equipeRepository.find();

    if (!equipes) {
      throw new NotFoundException(`Nenhuma equipe encontrada`);
    }
    return equipes.map((s) => {
      if (s.img_blob) {
        s.imagemBase64 = `data:${s.src_img};base64,${s.img_blob.toString('base64')}`;
      }
      return s;
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} equipe`;
  }

  async update(
    id: number,
    updateEquipeDto: UpdateEquipeDto,
    file: Express.Multer.File,
  ) {
    const equipe = await this.equipeRepository.findOne({
      where: { id },
    });

    if (!equipe) {
      throw new NotFoundException(`Equipe com id ${id} não encontrada`);
    }
    Object.assign(equipe, updateEquipeDto);
    if (file) {
      equipe.src_img = file.mimetype;
      equipe.img_blob = file.buffer;
    }
    const saved = await this.equipeRepository.save(equipe);
    return {
      ...saved,
      imagemBase64: saved.img_blob
        ? `data:${saved.src_img};base64,${saved.img_blob.toString('base64')}`
        : null,
    };
  }

  async remove(id: number) {
    if (id != null) {
      return await this.equipeRepository.delete(id);
    }
    return null;
  }
}
