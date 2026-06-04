jest.mock('pg', () => ({
  Pool: jest.fn().mockImplementation(() => ({
    query: jest.fn(),
  })),
}));

import { initDatabase, pool } from './database.config';

describe('Database configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize the database schema and seed data when users table is empty', async () => {
    (pool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [{ count: 0 }] })
      .mockResolvedValueOnce({ rows: [{ id: 1 }] })
      .mockResolvedValueOnce({ rows: [] });

    await expect(initDatabase()).resolves.not.toThrow();

    expect(pool.query).toHaveBeenCalledTimes(5);
  });
});