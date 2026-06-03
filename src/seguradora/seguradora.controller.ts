import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { SeguradoraService } from './seguradora.service';
import { CreateSeguradoraDto } from './dto/create-seguradora.dto';
import { UpdateSeguradoraDto } from './dto/update-seguradora.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('/seguradora')
export class SeguradoraController {
  constructor(private readonly seguradoraService: SeguradoraService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createSeguradoraDto: CreateSeguradoraDto,
  ) {
    return this.seguradoraService.create(createSeguradoraDto, file);
  }

  @Get()
  findAll() {
    return this.seguradoraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seguradoraService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: number,
    @Body() updateSeguradoraDto: UpdateSeguradoraDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.seguradoraService.update(+id, updateSeguradoraDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguradoraService.remove(+id);
  }
}
