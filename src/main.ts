/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Pos Inventory API')
    .setDescription('The pos-inventory API description')
    .setVersion('1.0')
    .addTag('pos-inv')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // CORS configuration
  // - In development you can allow all origins by setting ORIGIN_ALLOW_ALL=true
  // - In production prefer setting CORS_ORIGIN to a comma-separated allowlist
  const allowAll = process.env.ORIGIN_ALLOW_ALL === 'true';
  const envOrigins = process.env.CORS_ORIGIN || 'https://pos-and-inventory-bm5u.vercel.app';
  const allowedOrigins = envOrigins.split(',').map(o => o.trim()).filter(Boolean);

  app.enableCors({
    origin: allowAll ? true : function (origin, callback) {
      // allow requests with no origin (e.g., curl, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
