import { Controller, Get } from "@nestjs/common"; // ❶ 필요한 함수 임포트 

@Controller()     // ❷ 컨트롤러 데코레이터 
export class HelloController { // ❸ 외부에서 사용하므로 export를 붙여줍니다. 
  @Get()             // ❹ GET 요청 처리 데코레이터 
  hello() {
    return "안녕하세요! NestJS로 만든 첫 애플리케이션입니다."; 
  }
}
