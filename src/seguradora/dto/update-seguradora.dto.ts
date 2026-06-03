import { PartialType } from '@nestjs/mapped-types';
import { CreateSeguradoraDto } from './create-seguradora.dto';

export class UpdateSeguradoraDto extends PartialType(CreateSeguradoraDto) {}
