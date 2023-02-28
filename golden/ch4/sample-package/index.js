console.log("require로 부르면 실행됩니다."); // ❶ 모듈을 require함수로 포함시킬 때 실행됩니다. 

module.exports = {  // ❷ 외부로 노출할 객체를 저장합니다. 
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    multi: (a, b) => a * b,
    div: (a, b) => a / b
  }
  