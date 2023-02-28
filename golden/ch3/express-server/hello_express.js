const express = require("express"); // ❶ express모듈 불러오기
const app = express(); // ❷ express를 초기화 후 app에 할당
const port = 3000;

app.get("/", (req, res) => {  // ❸ / 으로 요청이 오는  경우 실행됨
  res.set({ "Content-Type": "text/html; charset=utf-8" }); // ➍ 헤더값 설정 
  res.end("헬로 express");
});

app.listen(port, () => {  // ➎ 서버를 기동하여 클라이언트 요청을 기다림
  console.log(`START SERVER : use ${port}`);
});
