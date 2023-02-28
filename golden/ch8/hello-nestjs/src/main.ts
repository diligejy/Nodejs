import { NestFactory } from "@nestjs/core";
import { HelloModule } from "./hello.module";

// ❶ NestJS를 시작시키는 함수 
async function bootstrap() {
  // ❷ NestFactory를 사용해서 NestApplication 객체 생성 
  const app = await NestFactory.create(HelloModule);

  // ❸ 3000번 포트로 서버 기동
  await app.listen(3000, () => { console.log ("서버 시작!"); });
}

bootstrap();
