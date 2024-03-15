import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig, swaggerOptions } from "./swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4500;
  app.enableCors();


  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document, swaggerOptions);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));


  await app.listen(4500);
  console.log(`server running on: http://localhost:${PORT}/docs`);
}
bootstrap();
