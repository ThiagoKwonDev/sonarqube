import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('servicos')
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  icone?: string;

  @Column('text')
  titulo: string;

  @Column('text')
  descricao: string;
}
