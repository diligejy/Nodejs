const axios = require("axios"); 

async function getTop20Movies() { // ❶  await를 사용하므로 async를 붙임 
  const url = "https://movie.daum.net/api/contents/brunch?size=20";
  try {
    const result = await axios.get(url); // ❷ 네트워크에서 데이터를 받아오므로 await로 기다림
    const { data } = result; // ❸ 결괏값(result)에는 data 프로퍼티가 있음 
    if (!data.articleList || data.articleList.size == 0) { // ❹ data 또는 articleList 없을 때 예외 처리 
      throw new Error("데이터가 없습니다.");
    }
    // ❺ data에서 필요한 영화 제목과 순위 정보를 뽑아냄 
    const movieInfos = data.articleList.map((article, idx) => {
      return { title: article.title, rank: idx + 1 };
    });

    // ❻ 데이터 출력
    for (let movieInfo of movieInfos) {
      console.log(`[${movieInfo.rank}위] ${movieInfo.title}`);
    }
  } catch (err) {
    // ❼ 예외 처리는 기존 코드와 같게 try catch로 감쌈
    throw new Error(err);
  }
}

// ❽ await를 함수 안에서만 사용 가능하므로 함수를 하나 생성해 실행
getTop20Movies();
