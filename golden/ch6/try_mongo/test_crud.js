const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://admin:admin1234@cluster0.mongodb.net/test?retryWrites=true&w=majority';

// ❶ MongoClient 생성
const client = new MongoClient(url, { useNewUrlParser: true });

async function main() {
  try {
    // ❷ 커넥션을 생성하고 연결을 시도
    await client.connect();

    console.log('MongoDB 접속 성공');

    // ❸ test 데이터베이스의 person 컬렉션 가져오기
    const collection = client.db('test').collection('person');


    // ❹ 문서 하나 추가
    await collection.insertOne({ name: 'Andy', age: 30 });
    console.log('문서 추가 완료');

    // ❺ 문서 찾기 
    const documents = await collection.find({ name: 'Andy' }).toArray();
    console.log('찾은 document:', documents);

    // ❻ 문서 갱신하기
    await collection.updateOne({ name: 'Andy' }, { $set: { age: 31 } });
    console.log('문서 업데이트');
    
    // ❼ 갱신된 문서 확인하기
    const updatedDocuments = await collection.find({ name: 'Andy' }).toArray();
    console.log('갱신된 document :', updatedDocuments);

    // ❽ 문서 삭제하기
    await collection.deleteOne({ name: 'Andy' });
    console.log('문서 삭제');

    // ❾ 연결 끊기 
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

main();
