const http = require("http");                    // ❶ http 객체 생성
let count = 0;

const server = http.createServer((req, res) => { // ❷ 서버 객체 생성
  console.log((count += 1));                     // ❸ 카운트 1 증가
  res.statusCode = 200;                          // ➍ 결과값 200
  res.setHeader("Content-Type", "text/plain");   // ➎ 헤더 세팅
  res.write("hello\n");                          // ➏ 응답 값 세팅
  setTimeout(() => {	                         // ➐ 2초후 Node.js 출력 
	res.end("Node.js");
  }, 2000);
});
server.listen(8000);                        // ❽ 8000번 포트로 서버 
