import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('contatos')
export class Contato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  icone?: string;

  @Column('text')
  titulo: string;

  @Column('text')
  descricao: string;
}
