import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvisoDto } from './dto/create-aviso.dto';
import { GetAvisosFilterDto } from './dto/get-avisos-filter.dto';
import { pool } from '../config/database.config';

@Injectable()
export class AvisosService {
  async findAll(filterDto: GetAvisosFilterDto) {
    const { categorias, locais } = filterDto;
    const conditions: string[] = [];
    const values: any[] = [];

    if (categorias) {
      const categoriasArray = categorias.split(',').map(c => c.trim().toLowerCase());
      values.push(categoriasArray);
      conditions.push(`LOWER(tipo) = ANY($${values.length})`);
    }

    if (locais) {
      const locaisArray = locais.split(',').map(l => l.trim().toLowerCase());
      values.push(locaisArray);
      conditions.push(`LOWER(local) = ANY($${values.length})`);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const result = await pool.query(`SELECT * FROM avisos ${where}`, values);
    return result.rows;
  }

  async create(createAvisoDto: CreateAvisoDto, autorId: number) {
    const result = await pool.query(
      `INSERT INTO avisos (tipo, titulo, descricao, local, tempo, curtidas, autor_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        createAvisoDto.tipo,
        createAvisoDto.titulo,
        createAvisoDto.descricao,
        createAvisoDto.local,
        'Agora mesmo',
        0,
        autorId,
      ],
    );

    return result.rows[0];
  }

  async curtir(id: number) {
    const result = await pool.query(
      'UPDATE avisos SET curtidas = curtidas + 1 WHERE id = $1 RETURNING *',
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException('Aviso não encontrado');
    }

    return result.rows[0];
  }

  async findOne(id: number) {
    const result = await pool.query('SELECT * FROM avisos WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      throw new NotFoundException('Aviso não encontrado');
    }
    
    return result.rows[0];
  }

  async update(id: number, updateAvisoDto: CreateAvisoDto, autorId: number) {
    const result = await pool.query(
      `UPDATE avisos 
       SET tipo = $1, titulo = $2, descricao = $3, local = $4 
       WHERE id = $5 AND autor_id = $6 
       RETURNING *`,
      [
        updateAvisoDto.tipo,
        updateAvisoDto.titulo,
        updateAvisoDto.descricao,
        updateAvisoDto.local,
        id,
        autorId,
      ],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException('Aviso não encontrado ou você não tem permissão para editá-lo');
    }

    return result.rows[0];
  }

  async remove(id: number, autorId: number) {
    const result = await pool.query(
      'DELETE FROM avisos WHERE id = $1 AND autor_id = $2 RETURNING *',
      [id, autorId],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException('Aviso não encontrado ou você não tem permissão para excluí-lo');
    }

    return result.rows[0];
  }
}
