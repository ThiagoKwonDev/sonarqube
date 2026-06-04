import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER ?? 'avisaaqui_user',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'avisaaqui',
});

export async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS avisos (
      id SERIAL PRIMARY KEY,
      tipo TEXT NOT NULL,
      titulo TEXT NOT NULL,
      descricao TEXT NOT NULL,
      local TEXT NOT NULL,
      tempo TEXT NOT NULL,
      curtidas INTEGER NOT NULL DEFAULT 0,
      autor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM users');
  if (rows.length > 0 && rows[0].count === 0) {
    const userResult = await pool.query(
      'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id',
      ['Estudante Teste', 'estudante@pucpr.edu.br', '123'],
    );

    const autorId = userResult.rows[0].id;
    await pool.query(
      `INSERT INTO avisos (tipo, titulo, descricao, local, tempo, curtidas, autor_id)
       VALUES
       ($1, $2, $3, $4, $5, $6, $7),
       ($8, $9, $10, $11, $12, $13, $14),
       ($15, $16, $17, $18, $19, $20, $21)`,
      [
        'Evento', 'Semana de tecnologia no bloco B', 'Palestras a semana toda', 'Bloco B', 'Hoje, 18:00', 235, autorId,
        'Alerta', 'Elevador do bloco C quebrado', 'Utilize as escadas', 'Bloco C', 'Há 20 minutos', 103, autorId,
        'Achados', 'Carteira encontrada no RU', 'Deixada na portaria', 'RU', 'Há 1 hora', 2, autorId,
      ],
    );
  }
}
