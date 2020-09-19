import { NestFactory } from '@nestjs/core';
import { WebAppModule } from './web-app.module';

async function bootstrap() {
  const app = await NestFactory.create(WebAppModule);
  await app.listen(3000);
}
bootstrap();
