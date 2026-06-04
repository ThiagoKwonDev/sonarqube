import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AvisosController } from './avisos.controller';
import { AvisosService } from './avisos.service';

const mockAviso = {
  id: 1,
  tipo: 'alerta',
  titulo: 'Título teste',
  descricao: 'Descrição teste',
  local: 'RU',
  tempo: '5min',
  curtidas: 0,
  autorId: 1,
};

const mockAvisosService = {
  findAll: () => [mockAviso],
  findOne: () => mockAviso,
  create: () => mockAviso,
  update: () => mockAviso,
  remove: () => ({ deleted: true }),
  curtir: () => ({ ...mockAviso, curtidas: 1 }),
};

describe('AvisosController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvisosController],
      providers: [{ provide: AvisosService, useValue: mockAvisosService }],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /avisos deve retornar lista', async () => {
    const res = await request(app.getHttpServer()).get('/avisos').expect(200);

    console.log("RESULTADO DO TESTE MOCK GET_ALL():",res.body);

    const body = res.body as (typeof mockAviso)[];
    expect(body).toHaveLength(1);
  });

  it('GET /avisos/:id deve retornar um aviso', async () => {
    const res = await request(app.getHttpServer()).get('/avisos/1').expect(200);

    const body = res.body as typeof mockAviso;
    expect(body.id).toBe(1);
  });

  it('POST /avisos deve criar um aviso', async () => {
    const res = await request(app.getHttpServer())
      .post('/avisos')
      .send({
        tipo: 'alerta',
        titulo: 'Título teste',
        descricao: 'Descrição teste',
        local: 'RU',
      })
      .expect(201);

    const body = res.body as typeof mockAviso;
    expect(body.id).toBe(1);
  });

  it('PUT /avisos/:id deve atualizar um aviso', async () => {
    const res = await request(app.getHttpServer())
      .put('/avisos/1')
      .send({
        tipo: 'alerta',
        titulo: 'Título atualizado',
        descricao: 'Desc',
        local: 'RU',
      })
      .expect(200);

    const body = res.body as typeof mockAviso;
    expect(body.id).toBe(1);
  });

  it('DELETE /avisos/:id deve remover um aviso', async () => {
    await request(app.getHttpServer()).delete('/avisos/1').expect(200);
  });

  it('POST /avisos/:id/curtir deve curtir', async () => {
    const res = await request(app.getHttpServer())
      .post('/avisos/1/curtir')
      .expect(201);

    const body = res.body as typeof mockAviso;
    expect(body.curtidas).toBe(1);
  });
});
