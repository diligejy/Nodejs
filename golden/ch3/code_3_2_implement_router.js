const http = require("http");
const url = require("url"); // ❶ url모듈을 로딩
http
  .createServer((req, res) => {
	const path = url.parse(req.url, true).pathname; // ❷ 패스명을 할당
	res.setHeader("Content-Type", "text/html");

	if (path === "/user") {
  	    res.end("[user] name : andy, age: 30"); // ❸ /user 결과값 설정
	} else if (path === "/feed") {
     	    res.end(`<ul>
    	    <li>picture1</li>
    	    <li>picture2</li>
    	    <li>picture3</li>
  	    </ul>
  	`); // ➍ /feed에 대한 결과값 설정 
	} else {
        res.statusCode = 404;
        res.end("404 page not found");  // ➎ 결과값으로 에러 메시지 설정
	}
  })
  .listen("3000", () => console.log("라우터를 만들어보자!"));
