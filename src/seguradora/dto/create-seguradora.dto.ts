export class CreateSeguradoraDto {
  id: number;
  nome: string;
  src_img: string;
  descricao?: string;
  img_blob: Express.Multer.File;
}
