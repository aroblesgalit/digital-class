import axios from "axios";
require("dotenv").config();

const statesSelect = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];

export default {
  // Log student in
  loginStudent: function (credentials) {
    return axios.post("/api/student-login/login", credentials);
  },
  // Teacher Log in
  loginTeacher: function (credentials) {
    return axios.post("/api/teacher-login/login", credentials);
  },
  //Log out
  checkAuth: function (){
    return axios.get("/api/student-login/logout");
  },
  // Log student out
  logoutUser: function() {
    return axios.get("/api/student-login/logout");
  },
  // Sign student up
  signupStudent: function (studentData) {
    return axios.post("/api/student-login/signup", studentData);
  },
  // Sign teacher up
  signupTeacher: function (teacherData) {
    return axios.post("/api/teacher-login/signup", teacherData);
  },
  // Creating a quiz
  createQuiz: function (quizData) {
    return axios.post("/api/quizzes", quizData);
  },
  // Creating a Homework assignment
  creatingHomework: function (homeworkData) {
    return axios.post("/api/homeworks", homeworkData)
  },
  // Get teacher data
  getTeacher: function () {
    return axios.get("/api/teacher-login/user_data");
  },
  // Get student data
  getStudentData: function () {
    return axios.get("/api/student-login/user_data");
  },
  // Get a teacher by id
  getTeacherById: function (id) {
    return axios.get("/api/teachers/" + id);
  },
  // Get teachers by school
  getTeachersBySchool: function (school) {
    return axios.get("/api/teachers/school/" + school);
  },
  // Get all students under the authenticated teacher
  getStudentsByTeacher: function () {
    return axios.get("/api/teacher-login/students");
  },
  // Create a result
  createResult: function (resultData) {
    return axios.post("/api/results", resultData);
  },
  // Get all results for a quiz
  getResultsByQuiz: function (quizId) {
    return axios.get("/api/results/quiz/" + quizId);
  },
  // Get all quizzes by teacher's id
  getQuizzesByTeacher: function () {
    return axios.get("/api/teacher-login/quizzes");
  },
  // Get a quiz by its id
  getQuizById: function (id) {
    return axios.get("/api/quizzes/" + id);
  },
  // Get all quizzes
  getAllQuizzes: function () {
    return axios.get("/api/quizzes")
  },
  // get quizzes for student by teacher id
  getQuizzesForStudent: function (id) {
    return axios.get("/api/quizzes/teacher/" + id)
  },
  updateQuizStudents: function (quizid, studentid) {
    return axios.put("/api/quizzes/" + quizid + "/" + studentid);
  },
  // Get all results for a homework
  getResultsByHomework: function (homeworkId) {
    return axios.get("/api/results/homework/" + homeworkId);
  },
  // Get all homeworks by teacher's id
  getHomeworksByTeacher: function () {
    return axios.get("/api/teacher-login/homeworks");
  },
  // Get a homework by its id
  getHomeworkById: function (id) {
    return axios.get("/api/homeworks/" + id);
  },
  // Get all homeworks
  getAllHomeworks: function () {
    return axios.get("/api/homeworks")
  },
  // get homeworks for student by teacher id
  getHomeworksForStudent: function (id) {
    return axios.get("/api/homeworks/teacher/" + id)
  },
  updateHomeworkStudents: function (homeworkid, studentid) {
    return axios.put("/api/homeworks/" + homeworkid + "/" + studentid);
  },
  // Search for schools
  searchSchools: function (query, state) {
    const appId = process.env.REACT_APP_ID;
    const appKey = process.env.REACT_APP_KEY;

    let queryUrl = `https://api.schooldigger.com/v1.2/autocomplete/schools?q=${query}&st=${state}&appID=${appId}&appKey=${appKey}`;
    return new Promise((resolve, reject) => {
      axios
        .get(queryUrl)
        .then(res => {
          const schools = res.data.schoolMatches;
          resolve(schools);
        })
        .catch(err => reject(err));
    })
  },
  // Get schools from search in db
  getSchoolsFromDB: function () {
    return axios.get("/api/schools");
  },
  // Add school search in db
  addSchoolToDB: function (data) {
    return axios.post("/api/schools", data);
  },
  // Get school by query
  getSchoolByQuery: function (query) {
    return axios.get("/api/schools/" + query);
  },
  getStudentById: function (id) {
    return axios.get("/api/students/" + id);
  },

  updateStudent: function (id, data) {
    return axios.put("/api/students/" + id, data);
  },
  updateTeacher: function (id, data) {
    return axios.put("/api/teachers/" + id, data);
  },
  // Get all 50 states
  getStates: function () {
    return statesSelect;
  },
  // Get result by quiz id and student id
  getResultsByQuizAndStudent: function (quiz, student) {
    return axios.get("/api/results/" + quiz + "/" + student);
  },
  updateStudentsTeachers: function (teachers) {
    return axios.put("/api/students/teacher", teachers);
  },
  // Add to sharedQuizzes
  addToSharedQuizzes: function (teacherid, quizid) {
    return axios.put("/api/teachers/" + teacherid + "/" + quizid);
  },
  // Remove one from sharedQuizzes
  removeASharedQuiz: function(teacherid, quizid) {
    return axios.put("/api/teacher-login/" + teacherid + "/" + quizid);
  }
};
