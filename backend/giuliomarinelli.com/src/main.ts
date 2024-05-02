import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const logger = new Logger('Bootstrap')
  const configSvc = app.get<ConfigService>(ConfigService)
  await app.register(fastifyCookie, {
    secret: configSvc.get<string>('KEYS.cookieSignSecret')
  });
  const port = configSvc.get<number>('APP.port')
  app.enableCors({
    origin: configSvc.get<string[]>('APP.CorsOrigins'),
    credentials: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: '*'
  })
  await app.listen(port);
  logger.log('Fastify Web Server listening on port ' + port)
}
bootstrap();
