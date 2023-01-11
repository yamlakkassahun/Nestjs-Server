import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as fs from 'fs';
import * as morgan from 'morgan';
import { ValidationPipe, VersioningType } from '@nestjs/common';

const logStream = fs.createWriteStream('src/helpers/logs/api.log', {
  flags: 'a', // append
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enabling cors
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // setting api prefix on every request
  app.setGlobalPrefix('api');

  //this is application level validation pipe
  app.useGlobalPipes(new ValidationPipe());

  //setting morgan for logs
  app.use(morgan('tiny', { stream: logStream }));

  //api versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  //swagger api documentation
  const config = new DocumentBuilder()
    .setTitle('Server with all Test example')
    .setDescription(
      'The Server with all Tests including unit tests, integration tests and e2e tests',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // start the server and listen on port
  await app.listen(3000, async () =>
    console.log(`Server is listening on ${await app.getUrl()}`),
  );
}
bootstrap();
