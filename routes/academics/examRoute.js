const express = require("express");
const {
  createExam,
  getExams,
  getExam,
  updateExam,
} = require("../../controller/Academics/examsCtrl");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const examRouter = express.Router();

examRouter.route("/", isTeacherLogin, isTeacher).post(createExam).get(getExams);
examRouter
  .route("/:id", isTeacherLogin, isTeacher)
  .get(getExam)
  .put(updateExam);

module.exports = examRouter;
