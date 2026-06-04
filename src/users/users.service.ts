import { Injectable, BadRequestException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { pool } from '../config/database.config';

@Injectable()
export class UsersService {
  async findByEmail(email: string) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  async findById(id: number) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  async create(user: any) {
    const exists = await this.findByEmail(user.email);
    if (exists) {
      throw new BadRequestException('E-mail já existe');
    }

    const result = await pool.query(
      'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [user.nome, user.email, user.senha],
    );

    return result.rows[0];
  }

  async updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    const user = await this.findById(id);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    if (updateProfileDto.email) {
      const exists = await pool.query(
        'SELECT id FROM users WHERE email = $1 AND id <> $2',
        [updateProfileDto.email, id],
      );
      if (exists.rows.length > 0) {
        throw new BadRequestException('E-mail já está em uso por outra conta');
      }
    }

    const updated = {
      ...user,
      ...updateProfileDto,
    };

    const result = await pool.query(
      'UPDATE users SET nome = $1, email = $2, senha = COALESCE($3, senha) WHERE id = $4 RETURNING *',
      [updated.nome, updated.email, updateProfileDto.senha || user.senha, id],
    );

    const { senha, ...userWithoutPassword } = result.rows[0];

    return {
      message: 'Perfil atualizado com sucesso',
      user: userWithoutPassword,
    };
  }
}
