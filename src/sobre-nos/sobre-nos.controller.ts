import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SobreNosService } from './sobre-nos.service';
import { CreateSobreNoDto } from './dto/create-sobre-no.dto';
import { UpdateSobreNoDto } from './dto/update-sobre-no.dto';

@Controller('/sobre-nos')
export class SobreNosController {
  constructor(private readonly sobreNosService: SobreNosService) {}

  @Post()
  create(@Body() createSobreNoDto: CreateSobreNoDto) {
    return this.sobreNosService.create(createSobreNoDto);
  }

  @Get()
  findAll() {
    return this.sobreNosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sobreNosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSobreNoDto: UpdateSobreNoDto) {
    return this.sobreNosService.update(+id, updateSobreNoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sobreNosService.remove(+id);
  }
}
