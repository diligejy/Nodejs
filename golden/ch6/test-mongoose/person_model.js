var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

const personSchema = new Schema({ // ❶ 스키마 객체 생성 
  name: String,
  age: Number,
  email: { type: String, required: true },
});

module.exports = mongoose.model('Person', personSchema); // ❷ 모델 객체 생성
