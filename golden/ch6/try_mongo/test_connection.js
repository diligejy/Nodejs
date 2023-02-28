
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin1234@cluster0.kyv1sdx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() { // ❶ async가 있으므로 비동기 처리 함수
  await client.connect();
  const adminDB = client.db('test').admin(); // ❷ admin DB 인스턴스
  const listDatabases = await adminDB.listDatabases(); // ❸ 데이터베이스 정보 가져오기
  console.log(listDatabases);
  return "OK";
}

run() // ❹ 실행 함수 
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

