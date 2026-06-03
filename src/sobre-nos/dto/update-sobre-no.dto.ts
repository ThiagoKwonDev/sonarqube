import { PartialType } from '@nestjs/mapped-types';
import { CreateSobreNoDto } from './create-sobre-no.dto';

export class UpdateSobreNoDto extends PartialType(CreateSobreNoDto) {}
