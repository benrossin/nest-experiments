import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { NestExpressApplication } from '@nestjs/platform-express';
import { accessTokenKey } from './auth/constants/auth.constant';
import { join } from 'path';
import helmet from 'helmet';
import * as expressBasicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';
import { ValidationFilter } from './common/filters/validation.filter';
import { ValidationException } from './common/exceptions/validation.exception';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  /**
   * Config
   */
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [configService.get<string>('FRONT_URL')],
    methods: ['POST', 'PATCH', 'PUT', 'DELETE', 'GET'],
    credentials: true,
  });
  app.disable('x-powered-by');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use(helmet());

  /**
   * Interceptors
   */
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  /**
   * Pipes
   */
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationException(validationErrors);
      },
    }),
  );

  /**
   * Swagger
   */
  app.use(['/api/docs', '/api/docs/*'], expressBasicAuth({ challenge: true, users: { admin: configService.get<string>('SWAGGER_DOC_PWD') } }));
  const config = new DocumentBuilder()
    .setTitle('Monumentales')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, accessTokenKey)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customCssUrl: '../css/swagger.css',
    customSiteTitle: 'API - Documentation',
  });

  await app.listen(parseInt(configService.get<string>('PORT')) || 3000);
}
bootstrap();
