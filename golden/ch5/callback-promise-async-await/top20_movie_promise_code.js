const axios = require("axios"); // ❶ axios 임포트 
const url = "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json"; // ❷ 영화 순위 정보 URL

axios
  .get(url) // ❸ GET 요청
  .then((result) => { // ❹ 결괏값 처리 
    if (result.status != 200) { // ❺ 상태가 200이 아니면 에러 
      throw new Error("요청에 실패했습니다!");
    }

    if (result.data) { // ❻ result.data가 있으면 결과를 반환 
      return result.data;
    }

    throw new Error("데이터 없습니다."); // ❼ data가 없으면 에러
  })
  .then((data) => { // ❽ ❻에서 받은 데이터를 처리 
    if (!data.articleList || data.articleList.size == 0) { // ❾ 크기가 0이면 에러
      throw new Error("데이터가 없습니다.");
    }
    return data.articleList; // ❿ 영화 리스트를 반환 
  })
  .then((articles) => {
    return articles.map((article, idx) => { // ⓫ 영화 리스트를 제목과 순위정보로 분리 
      return { title: article.title, rank: idx + 1 };
    });
  })
  .then((results) => {
    for (let movieInfo of results) { // ⓬ 받은 영화 리스트 정보 출력 
      console.log(`[${movieInfo.rank}위] ${movieInfo.title}`);
    }
  })
  .catch((err) => { // ⓭ 중간에 발생한 에러들을 여기서 처리 
    console.log("<<에러 발생>>");
    console.error(err);
  });
