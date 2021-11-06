import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 4321;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
bootstrap();
