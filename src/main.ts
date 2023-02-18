import { setupSwagger } from './common/swagger/swagger.module';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    forbidNonWhitelisted:true,
    transformOptions:{
      enableImplicitConversion:true
    }    
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  const ORIGINS: string[] = configService.get<string>('ORIGIN').split(',');
  const CORS_METHODS: string[] = configService
    .get<string>('CORS_METHODS')
    .split(',');

  app.enableCors({
    origin: ORIGINS,
    methods: CORS_METHODS,
    credentials: true,
  });
  const appPort = configService.get<number>('PORT');
  if (configService.get('ENABLE_DOCUMENTATION') === 'true') {
    setupSwagger(app);
  }
  await app.listen(appPort);
}
bootstrap();
