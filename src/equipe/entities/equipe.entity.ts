import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('equipe')
export class Equipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  src_img: string;

  @Column('text')
  nome: string;

  @Column('text')
  cargo: string;

  @Column('bytea', { nullable: true })
  img_blob: Buffer;

  imagemBase64?: string;
}
