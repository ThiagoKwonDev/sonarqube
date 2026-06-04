import { Controller, Get, Post, Body, Query, UseGuards, Request, Param, Put, Delete } from '@nestjs/common';
import { AvisosService } from './avisos.service';
import { CreateAvisoDto } from './dto/create-aviso.dto';
import { GetAvisosFilterDto } from './dto/get-avisos-filter.dto';

@Controller('avisos')
export class AvisosController {
  constructor(private readonly avisosService: AvisosService) {}

  @Get()
  findAll(@Query() filterDto: GetAvisosFilterDto) {
    return this.avisosService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avisosService.findOne(+id);
  }

  @Post()
  create(@Body() createAvisoDto: CreateAvisoDto) {
    return this.avisosService.create(createAvisoDto, 1);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAvisoDto: CreateAvisoDto) {
    return this.avisosService.update(+id, updateAvisoDto, 1);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avisosService.remove(+id, 1);
  }

  @Post(':id/curtir')
  curtir(@Param('id') id: string) {
    return this.avisosService.curtir(+id);
  }
}
