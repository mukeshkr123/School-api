const express = require("express");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const isTeacher = require("../../middlewares/isTeacher");
const { CreateQuestion } = require("../../controller/Academics/questionCtr");

const questionRouter = express.Router();

questionRouter.post("/:examId", isTeacherLogin, isTeacher, CreateQuestion);

module.exports = questionRouter;
