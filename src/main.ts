import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { SeedService } from './seed/seed.service';
declare const module: any;

async function bootstrap() {
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // const seedService = app.get(SeedService);
  // await seedService.seed();
  const configService = app.get(ConfigService); // get the instance of
  // config swagger ui
  const config = new DocumentBuilder() //1
    .setTitle("NamVippro Clone")
    .setDescription("The Hanabi Api documentation")
    .setVersion("1.0")
    .addBearerAuth(
      // Enable Bearer Auth here
      {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "JWT",
      description: "Enter JWT token",
      in: "header",
      },
      "JWT-auth" // We will use this Bearer Auth with the JWT-auth name on the
      // controller function
      )
      
    .build();
  const document = SwaggerModule.createDocument(app, config); //2
  SwaggerModule.setup("api", app, document); //3
  await app.listen(configService.get<number>("port"));
}
bootstrap();
