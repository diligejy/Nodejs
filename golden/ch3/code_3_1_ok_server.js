const http = require("http");                       
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html"); // ❶ 응답의 헤더 설정
  res.end("OK"); // ❷ OK를 응답하고 종료 
});

server.listen("3000", () => console.log("OK 서버 시작!")); // ❸ 접속 대기
