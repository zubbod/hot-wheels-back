import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 4321;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const swaggerConf = new DocumentBuilder()
    .setTitle('Hot Wheels Collection Api')
    .setDescription('Documentation REST Api')
    .setVersion('1.0.0')
    .addTag('Hot Wheels')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConf);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('api');

  // const enableCors = process.env.PROD === 'true';

  app.enableCors({
    // origin: enableCors ? 'http://localhost:4200' : 'http://192.168.0.108:4200',
    origin: 'http://localhost:4200',
  });

  await app.listen(port, () => {
    console.log(`Server started on port ${port}, process.env.PROD: ${process.env.PROD}`);
  });
}
bootstrap();
