const calc = require("sample-package");  // ❶ sample-package 불러오기 

const a = 17;
const b = 3;

console.log("a + b = ", calc.add(a, b));  // ❷ 더하기 
console.log("a - b = ", calc.sub(a, b));   // ❸ 빼기 
console.log("a * b = ", calc.multi(a, b)); // ❹ 곱하기 
console.log("a / b = ", calc.div(a, b));    // ❺ 나누기 
