const express = require("express");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const isTeacher = require("../../middlewares/isTeacher");
const {
  CreateQuestion,
  GetAllQuestions,
} = require("../../controller/Academics/questionCtr");

const questionRouter = express.Router();

questionRouter.post("/:examId", isTeacherLogin, isTeacher, CreateQuestion);

questionRouter.get("/", isTeacherLogin, isTeacher, GetAllQuestions);

module.exports = questionRouter;
