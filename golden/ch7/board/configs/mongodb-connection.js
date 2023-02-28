const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://admin:admin1234@cluster0.kyv1sdx.mongodb.net/board";  // ❶ 몽고디비 연결 주소

module.exports = function (callback) { // ❷ 몽고디비 커넥션 연결 함수 반환 
  return MongoClient.connect(uri, callback); 
};
