if (!globalThis.crypto) { globalThis.crypto = require('node:crypto'); }
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://www.vicentin.com.br', 'https://vicentin.com.br'], // substitua pelo domínio do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // credentials: true, // se precisar enviar cookies ou auth
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
