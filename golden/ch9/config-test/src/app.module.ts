import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import config from '../envs/config';

console.log('env : ' + process.env.NODE_ENV); // ❶ 기동 시 환경 변수 출력
console.log('current working directory : ' + process.cwd()); // ❶ 현재 디렉터리 출력

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`, // ❷ 환경 변수 파일 경로 지정
      load: [config], // ❶ 커스텀 설정 파일을 설정
      cache: true, // ❶ 캐시하기 
      expandVariables: true, // ❶ 확장 변수 옵션 추가
    }),
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
