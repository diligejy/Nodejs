import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';          // ❶ ConfigService 임포트 

@Controller('weather')
export class WeatherController {
  constructor(private configService: ConfigService) {}   // ❷ 의존성 주입 

  @Get()
  public getWeather(): string {
    const apiUrl = this.configService.get('WEATHER_API_URL'); // ❸ 환경 변숫값 가져오기
    const apiKey = this.configService.get('WEATHER_API_KEY');

    // 날씨 API 호출
    return this.callWheatherApi(apiUrl, apiKey); // ❹ 내부 함수인 callWeatherAPI()를 호출 
  }

  private callWheatherApi(apiUrl: string, apiKey: string): string {
    console.log('날씨 정보 가져오는 중...');
    console.log(apiUrl);
    console.log(apiKey);
    return '내일은 맑음';
  }
}
