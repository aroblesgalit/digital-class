import axios from "axios";

export default {
  // Log student in
  loginStudent: function(credentials) {
    return axios.post("/api/student-login/login", credentials);
  },
  // Sign teacher up
  signupTeacher: function(teacherData) {
    return axios.post("/api/teacher-login/signup", teacherData);
  },
  // Creating a quiz
  createQuiz: function(quizData) {
    return axios.post("/api/quizzes", quizData);
  }
};
