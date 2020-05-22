const express = require("express");
const db = require("./models");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/digitalClass", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.post("/api/quizes", (req, res) =>{
  console.log("New Quiz" - req.body)
  db.Quiz.create(req.body)
  .then(dbQuiz => {
      console.log("Quiz added")
      res.json(dbQuiz)
  })
  .catch(err => {
      res.json(err)
  })
})


app.get("/api/teachers", (req, res) =>{
  db.Teacher.find({})
  .then(dbTeacher => {
      res.json(dbTeacher)
  })
  .catch(err =>{
      res.json(err);
  })
})

app.post("/api/teachers", (req, res) =>{
  console.log("New Teacher" - req.body)
  db.Teacher.create(req.body)
  .then(dbTeacher => {
      console.log("Teacher added")
      res.json(dbTeacher)
  })
  .catch(err => {
      res.json(err)
  })
})

app.get("/api/teachers/:id", (req,res) => {
  db.Quiz.find({ teacher })
  .then(dbQuiz => {
    res.json(dbQuiz)
  })
  .catch(err => {
    res.json(err)
  })
})

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});