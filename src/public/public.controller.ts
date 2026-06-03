import { Controller, Get } from '@nestjs/common';
import { EquipeService } from 'src/equipe/equipe.service';
import { SeguradoraService } from 'src/seguradora/seguradora.service';

@Controller('/public')
export class PublicController {
  constructor(
    private readonly seguradoraService: SeguradoraService,
    private readonly equipeService: EquipeService,
  ) {}
  @Get('/seguradoras')
  findAllSeg() {
    return this.seguradoraService.findAll();
  }

  @Get('/equipe')
  findAllEq() {
    return this.equipeService.findAll();
  }
}
