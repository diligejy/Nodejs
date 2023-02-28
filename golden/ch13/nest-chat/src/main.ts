import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // ❶ NestExpressApplication의 인스턴스 생성  
    const app = await NestFactory.create<NestExpressApplication>(AppModule); 
    app.useStaticAssets(join(__dirname, '..', 'static')); // ❷ 정적 파일 경로 지정
    await app.listen(3000);
  }
  bootstrap();
  
