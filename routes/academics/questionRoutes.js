const express = require("express");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const isTeacher = require("../../middlewares/isTeacher");
const {
  CreateQuestion,
  GetAllQuestions,
  GetSingleQuestion,
} = require("../../controller/Academics/questionCtr");

const questionRouter = express.Router();

questionRouter.post("/:examId", isTeacherLogin, isTeacher, CreateQuestion);
questionRouter.get("/", isTeacherLogin, isTeacher, GetAllQuestions);
questionRouter.get("/:id", isTeacherLogin, isTeacher, GetSingleQuestion);

module.exports = questionRouter;
