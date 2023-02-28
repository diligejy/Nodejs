function goodPromise(val) {
    return new Promise((resolve, reject) => { // ❶ Promise를 생성 후 반환 
      resolve(val);
    });
  }
  
  goodPromise("세상에")
    .then((val) => {  // ❷ Promise에서 resolve 이후에는 then 호출 가능 
      return val + " 이런";
    })
    .then((val) => {
      return val + " 코드는";
    })
    .then((val) => {
      return val + " 없습니다. ";
    })
    .then((val) => {
      console.log(val);
    })
    .catch((err) => { // ❸ Promise에서 reject가 호출 되었을 경우 실행 
      console.log(err);
    });
  