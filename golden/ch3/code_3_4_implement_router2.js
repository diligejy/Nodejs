const http = require("http");
const url = require("url"); // ❶ url모듈을 로딩
http
  .createServer((req, res) => {
	const path = url.parse(req.url, true).pathname; // ❷ 패스명을 할당
	res.setHeader("Content-Type", "text/html");

	if (path === "/user") {
  	    user(req, res); // ❸ /user 결과값 설정
	} else if (path === "/feed") {
        feed(req, res);
	} else {
        notFound(req, res);  // ➎ 결과값으로 에러 메시지 설정
	}
  })
  .listen("3000", () => console.log("라우터를 만들어보자!"));

  
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

