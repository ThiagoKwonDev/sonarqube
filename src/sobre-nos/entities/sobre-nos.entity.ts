import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sobre_nos')
export class SobreNos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  titulo: string;

  @Column('text')
  texto: string;
}
