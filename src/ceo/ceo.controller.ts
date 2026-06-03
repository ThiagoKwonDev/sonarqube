import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CeoService } from './ceo.service';
import { CreateCeoDto } from './dto/create-ceo.dto';
import { UpdateCeoDto } from './dto/update-ceo.dto';

@Controller('/ceo')
export class CeoController {
  constructor(private readonly ceoService: CeoService) {}

  @Post()
  create(@Body() createCeoDto: CreateCeoDto) {
    return this.ceoService.create(createCeoDto);
  }

  @Get()
  findAll() {
    return this.ceoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ceoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCeoDto: UpdateCeoDto) {
    return this.ceoService.update(+id, updateCeoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ceoService.remove(+id);
  }
}
