import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/equipe')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createEquipeDto: CreateEquipeDto,
  ) {
    return this.equipeService.create(createEquipeDto, file);
  }

  @Get()
  findAll() {
    return this.equipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipeService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: number,
    @Body() updateEquipeDto: UpdateEquipeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.equipeService.update(+id, updateEquipeDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipeService.remove(+id);
  }
}
