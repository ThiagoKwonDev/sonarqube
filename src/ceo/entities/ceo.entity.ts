import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ceo')
export class Ceo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  src_img: string;

  @Column('text')
  nome: string;

  @Column('text')
  cargo: string;
}
