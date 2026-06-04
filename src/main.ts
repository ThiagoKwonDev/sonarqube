import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDatabase } from './config/database.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await initDatabase();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
