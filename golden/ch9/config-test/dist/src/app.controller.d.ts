import { ConfigService } from '@nestjs/config';
export declare class AppController {
    private configService;
    constructor(configService: ConfigService);
    getHello(): string;
    getServiceUrl(): string;
    getTest(): string;
    getRedisInfo(): string;
    getServerUrl(): string;
}
