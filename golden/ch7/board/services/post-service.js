const paginator = require("../utils/paginator"); 
const { ObjectId } = require("mongodb");

// 글쓰기
async function writePost(collection, post) {  // ❶ 글쓰기 함수 
    // 생성일시와 조회수를 넣어줍니다.
    post.hits = 0;
    post.createdDt = new Date().toISOString(); // ❷ 날짜는 ISO 포맷으로 저장 
    return await collection.insertOne(post); // ❸ 몽고디비에 post를 저장 후 결과를 반환 
  }
  
  module.exports = { // ❹ require()로 파일을 임포트 시 외부로 노출하는 객체
    writePost,
  };
  
  async function list(collection, page, search) {
    const perPage = 10;
    const query = { title: new RegExp(search, "i") }; // ❶ title이 search와 부분일치하는지 확인 
    const cursor = collection.find(query, { limit: perPage, skip: (page - 1) * perPage }).sort({
      createdDt: -1,
    });  // ❷ limit는 10개만 가져온다는 의미, skip은 설정된 개수만큼 건너뛴다(skip). 생성일 역순으로 정렬 
    const totalCount = await collection.count(query); // ❸  검색어에 걸리는 게시물의 총합 
    const posts = await cursor.toArray(); // ❹ 커서로 받아온 데이터를 리스트로 변경 
    const paginatorObj = paginator({ totalCount, page, perPage: perPage }); // ❺ 페이지네이터 생성
    return [posts, paginatorObj]; 
  }
  
module.exports = {
list,
writePost,
}

// ❶ 패스워드는 노출 할 필요가 없으므로 결괏값으로 가져오지 않음
const projectionOption = {
  projection: {
    // 프로젝션(투영) 결괏값에서 일부만 가져올 때 사용
    password: 0,
    "comments.password": 0,
  },
};

async function getDetailPost(collection, id) {
  // ❷ 몽고디비 Collection의 findOneAndUpdate 함수를 사용. 게시글을 읽을 때마다 hits를 1 증가 
  return await collection.findOneAndUpdate({ _id: ObjectId(id) }, { $inc: { hits: 1 } }, projectionOption);
}

module.exports = {
  list,
  writePost,
  getDetailPost,
}
async function getPostByIdAndPassword(collection, { id, password }) {
  //  ❶ findOne() 함수 사용 
  return await collection.findOne({ _id: ObjectId(id), password: password }, projectionOption);
}

// ❷ id로 데이터 불러오기 
async function getPostById(collection, id) {
  return await collection.findOne({ _id: ObjectId(id) }, projectionOption);
}

// ❸ 게시글 수정 
async function updatePost(collection, id, post) {
  const toUpdatePost = {
    $set: {
      ...post,
    },
  };
  return await collection.updateOne({ _id: ObjectId(id) }, toUpdatePost);
}

module.exports = {
  list,
  writePost,
  getDetailPost,
  updatePost,
  getPostById,
  getPostByIdAndPassword,
  updatePost,
};
