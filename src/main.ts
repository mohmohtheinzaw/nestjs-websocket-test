import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger,ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as basicAuth from 'basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';

async function bootstrap() {
  const port = 3000
  const app = await NestFactory.create(AppModule);

  app.use('/docs',(req:Request,res:Response,next:NextFunction)=>{
    const credentials = basicAuth(req)
    if(!credentials || credentials.name !=='12345' || credentials.pass !=='12345'){
        res.setHeader('WWW-Authenticate', 'Basic realm="swagger"');
        res.status(401).send('Unauthorized')
    }else{
      next()
    }
  })
  app.setGlobalPrefix('api')
  app.enableCors()
  app.use(morgan('dev'));

  // app.useGlobalFilters(new NotFoundExceptionFilter());
  // app.useGlobalInterceptors(new ErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  let development = process.env.NODE_ENV === 'development' ? true : false;
  if (development) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Socket Testing')
      .setTermsOfService('Terms Of Service')
      .setDescription(
        'test description',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);
  }

  await app.listen(port,()=>{
    Logger.log(`App is running on port ${port}`)
  });
}

bootstrap();









// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
// import { ErrorInterceptor } from './interceptor/error.interceptor';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import morgan from 'morgan';
// import { NotFoundExceptionFilter } from './exception/NotFoundException';
// import basicAuth from 'basic-auth';
// import { NextFunction, Request, Response } from 'express';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.use('/docs', (req: Request, res: Response, next: NextFunction) => {
//     const credentials = basicAuth(req);
//     if (!credentials || credentials.name !== 'asdfghjkl;' || credentials.pass !== 'asdfghjkl;') {
//       res.setHeader('WWW-Authenticate', 'Basic realm="swagger"');
//       res.status(401).send('Unauthorized');
//     } else {
//       next();
//     }
//   })

//   app.setGlobalPrefix('api')
//   app.enableVersioning({
//     type: VersioningType.URI,
//     // defaultVersion: '1',
//   });
//   app.enableCors();
//   app.useGlobalFilters(new NotFoundExceptionFilter());
//   app.useGlobalInterceptors(new ErrorInterceptor());
//   app.useGlobalPipes(new ValidationPipe({
//     transform: true,
//     transformOptions: { enableImplicitConversion: true },
//     forbidNonWhitelisted: true,
//   }),);
//   app.use(morgan('dev'));
//   let development = process.env.NODE_ENV === 'development' ? true : false;
//   if (development) {
//     const config = new DocumentBuilder()
//       .addBearerAuth()
//       .setTitle('Fary Taxi API Service')
//       .setTermsOfService('Terms Of Service')
//       .setDescription(
//         'The Fary Taxi API Service is a robust and user-friendly platform that allows developers to integrate taxi booking and ride-hailing capabilities into their applications. Fary Taxi API enables seamless transportation experiences for users by providing access to a vast network of licensed drivers and reliable vehicles.',
//       )
//       // .setVersion('0.0.1')
//       // .addServer('')
//       // .addServer('v2')
//       .build();
//     const document = SwaggerModule.createDocument(app, config);
//     SwaggerModule.setup('/docs', app, document);
//   }

//   await app
//     .listen(3003)
//     .then(() => {
//       Logger.log('🚀 Gateway Server Successfully started')
//     });
// }
// bootstrap();

