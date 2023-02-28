const express = require("express");
const app = express();
let board = []; 

// res.body를 사용하지 않으려면  json 미들웨어를 사용해야 한다.
// 사용하지 않으면 undefined로 반환
app.use(express.json()); 
app.use(express.urlencoded({extended : true})); // json 미들웨어와 함께 사용
app.get("/", (req, res) => {
    res.json(board); //  게시글 리스를 JSON형식으로 보여줌 
})

app.post("/board", (req, res) => {
    const {title, name, text } = req.body; 

    // 게시글 리스트에 새로운 게시글 정보 추가 
    board.push({id:board.length + 1, title, name, text, createDt: Date()});
    res.json({title, name, text});
});

app.delete("/board/:id", (req, res) => {
    const id = req.params.id; // app.delete에 설정한 path정보에서 id값을 가져옴
    const filteredBoard = board.filter((post) => post.id !== +id); // 글 삭제 로직
    const isLengthChanged = board.length !== filteredBoard.length; // 삭제 확인
    board = filteredBoard;
    if (isLengthChanged) {
        // board의 데이터 갯수가 변경되었으면 삭제 성공
        res.json("OK");
        return;
    }
    res.json("NOT CHANGED");
});

app.listen(3000, () => {
    console.log("welcome board START!");
})