import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('seguradoras')
export class Seguradora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  nome: string;

  @Column('text')
  src_img: string;

  @Column('text', { nullable: true })
  descricao?: string;

  @Column('bytea', { nullable: true })
  img_blob: Buffer;

  imagemBase64?: string;
}
