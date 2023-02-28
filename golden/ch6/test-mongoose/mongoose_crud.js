const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person_model");
mongoose.set("strictQuery", false);// ❶ 설정해줘야 경고가 뜨지 않음

const app = express();
app.use(bodyParser.json()); // ❷ HTTP에서 Body를 파싱하기 위해 설정
app.listen(3000, async () => {
  console.log("Server started");
  const mongodbUri =   "mongodb+srv://admin:admin1234@cluster0.c4xru.mongodb.net/test?retryWrites=true&w=majority";

   // ❸ 몽고디비에 커넥션 맺기 
  mongoose
    .connect(mongodbUri, { useNewUrlParser: true })
    .then(console.log("Connected to MongoDB"));
});

// ❹ 모든 person 데이터 출력
app.get("/person", async (req, res) => {
  const person = await Person.find({});
  res.send(person);
});

// ❺ 특정 이메일로 person 찾기 
app.get("/person/:email", async (req, res) => {
  const person = await Person.findOne({ email: req.params.email });
  res.send(person);
});

// ❻ person 데이터 추가하기 
app.post("/person", async (req, res) => {
  const person = new Person(req.body);
  await person.save();
  res.send(person);
});

// ❼ person 데이터 수정하기 
app.put("/person/:email", async (req, res) => {
  const person = await Person.findOneAndUpdate(
    { email: req.params.email },
    { $set: req.body },
    { new: true }
  );
  console.log(person);
  res.send(person);
});

// ❽ person 데이터 삭제하기 
app.delete("/person/:email", async (req, res) => {
  await Person.deleteMany({ email: req.params.email });
  res.send({ success: true });
});
