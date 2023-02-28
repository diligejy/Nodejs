const http = require("http");
const url = require("url"); // ❶ url모듈을 로딩

http
  .createServer((req, res) => {
	const path = url.parse(req.url, true).pathname;
	res.setHeader("Content-Type", "text/html");
	if (path in urlMap) {   // ❶ urlMap에 패스가 있는지 확인
  	  urlMap[path](req, res); // ❷ urlMap에 path값으로 매핑된 함수 실행 
	} else {
  	  notFound(req, res);
	}
  })
  .listen("3000", () => console.log("라우터를 리팩터링해보자!"));

  
const user = (req, res) => {
    const userInfo = url.parse(req.url, true).query; // ❶ 쿼리스트링데이터를 userInfo에 할당
    res.end(`[user] name : ${userInfo.name}, age: ${userInfo.age}`); // ❷ 결과값으로 이름과 나이를 설정
};
  
const feed = (req, res) => {res.end(`<ul>
<li>picture1</li>
<li>picture2</li>
<li>picture3</li>
</ul>
`); // ➍ /feed에 대한 결과값 설정 
}

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 page not found");
}

// ❸ 라우터 규칙 매핑 키로 path가 들어가고 값에 함수를 할당한다. 
const urlMap = {
    "/" : (req, res) => res.end("HOME"),
    "/user" : user,
    "/feed" : feed,
};