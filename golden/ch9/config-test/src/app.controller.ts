import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';              // ❶ ConfigService 임포트 

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}  // ❷ ConfigService 주입

  @Get()
  getHello(): string {
    const message = this.configService.get('MESSAGE'); // ❸ configService.get() 호출
    return message;
  }
  @Get('service-url') // ❶ http://localhost:3000/service-url의 경로 진입 시 실행 
  getServiceUrl(): string {
    return this.configService.get('SERVICE_URL');  // ❷ SERVICE_URL 환경 변수를 반환 
  }
  @Get('db-info') // ❶ 라우팅 정보 
  getTest(): string { 
    console.log(this.configService.get('logLevel')); // ❷ logLevel 터미널에 출력
    console.log(this.configService.get('apiVersion')); // ❸ apiVersion 터미널에 출력
    return this.configService.get('dbInfo'); // ❹ 웹브라우저에 dbInfo 표시
  }
  @Get('redis-info')
  getRedisInfo(): string {
    return `${this.configService.get('redis.host')}:${this.configService.get('redis.port')}`;
  }
  @Get('server-url')
  getServerUrl(): string {
    return this.configService.get('SERVER_URL'); //  ❶ 확장 변숫값 읽기 
  }

}
