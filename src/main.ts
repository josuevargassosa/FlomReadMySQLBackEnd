import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const config = new DocumentBuilder()
  .setTitle('FlomRead API')
  .setDescription('API REST')
  .setVersion('1.0')
  .addBearerAuth()
  // .addTag('flomread')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs/resnow', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
