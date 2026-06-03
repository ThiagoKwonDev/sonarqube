export class CreateEquipeDto {
  id: number;
  src_img: string;
  nome: string;
  cargo: string;
  img_blob: Express.Multer.File;
}
