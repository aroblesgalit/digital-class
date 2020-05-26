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
  // Get teacher data
  getTeacher: function() {
    return axios.get("/api/teacher-login/user_data");
  },
  // Get student data
  getStudentData: function() {
    return axios.get("/api/student-login/user_data");
  },
  // Get all students
  getAllStudents: function() {
    return axios.get("/api/students");
  }
  // Get quiz data
};
