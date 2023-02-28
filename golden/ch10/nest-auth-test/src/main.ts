import { ValidationPipe } from '@nestjs/common'; // ❶ validationPipe 임포트 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());  // ❶ 쿠키 파서 설정 
  await app.listen(3000);
}
bootstrap();
