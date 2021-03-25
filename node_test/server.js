const express = require('express');
const app = express();

app.listen(3535, function(){
    console.log('listening on 3535');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/write', function(req, res) {
    res.sendFile(__dirname + '/write.html');
});
// 누가 /pet으로 방문하면 
// pet 관련 안내문을 띄워주자
app.get('/pet', function(req, res) {
    res.send('펫 용품 쇼핑할 수 있는 페이지입니다');
});

app.get('/beauty', function(req, res){
    res.send('뷰티용품 쇼핑 페이지임');
});