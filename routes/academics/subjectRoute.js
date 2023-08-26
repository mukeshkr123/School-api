const express = require("express");

const isLogin = require("../../middlewares/isLoggedin");
const isAdmin = require("../../middlewares/isAdmin");
const {
  createSubject,
  getSubjectsCtrl,
  getSubjectCtrl,
  updateSubjectCtrl,
  deleteSubjectCtrl,
} = require("../../controller/Academics/subjectCtrl");
const subjectRouter = express.Router();

subjectRouter.post("/:programID", isLogin, isAdmin, createSubject);

subjectRouter.get("/", isLogin, isAdmin, getSubjectsCtrl);

subjectRouter
  .route("/:id")
  .get(isLogin, isAdmin, getSubjectCtrl)
  .put(isLogin, isAdmin, updateSubjectCtrl)
  .delete(isLogin, isAdmin, deleteSubjectCtrl);

module.exports = subjectRouter;
