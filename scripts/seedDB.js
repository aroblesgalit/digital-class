const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/digitalClass"
);

const studentSeed = [
  {
    name: "Alvin Galit",
    school: "Tustin High School",
    teachers: ["Eric Something", "Israel Somethingelse", "Michelle Someother"],
    email: "alvin@gmail.com",
    password: "password123"
  },
  {
    name: "John Doe",
    school: "Austin High School",
    teachers: ["Eric Something", "Israel Somethingelse", "Michelle Someother"],
    email: "john@gmail.com",
    password: "password456"
  }
];

db.Student
  .remove({})
  .then(() => db.Student.collection.insertMany(studentSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
