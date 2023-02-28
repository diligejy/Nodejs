import { ConfigService } from '@nestjs/config';
export declare class WeatherController {
    private configService;
    constructor(configService: ConfigService);
    getWeather(): string;
    private callWheatherApi;
}
