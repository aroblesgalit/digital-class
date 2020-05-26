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
  },
  // Get authenticated student data
  getStudentData: function() {
    return axios.get("/api/student-login/user_data");
  },
  // Get all students under the authenticated teacher
  getStudentsByTeacher: function(teacherId) {
    return axios.get("/api/students", teacherId);
  },
  // Get all results for a quiz
  getResultsByQuiz: function(quizId) {
    return axios.get("/api/results", quizId);
  },
  getQuizByTeacher: function(teacherId) {
    return axios.get("/api/quizzes", teacherId);
  }
};
