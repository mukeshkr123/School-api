const express = require("express");
const { createExam } = require("../../controller/Academics/examsCtrl");
const isAdminLogin = require("../../middlewares/isAdminLoggedin");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const examRouter = express.Router();

examRouter.route("/").post(isTeacherLogin, isTeacher, createExam);

module.exports = examRouter;
