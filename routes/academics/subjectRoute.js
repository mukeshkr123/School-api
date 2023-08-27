const express = require("express");

const isAdmin = require("../../middlewares/isAdmin");

const {
  createSubject,
  getSubjectsCtrl,
  getSubjectCtrl,
  updateSubjectCtrl,
  deleteSubjectCtrl,
} = require("../../controller/Academics/subjectCtrl");
const isAdminLogin = require("../../middlewares/isAdminLoggedin");
const subjectRouter = express.Router();

subjectRouter.post("/:programID", isAdminLogin, isAdmin, createSubject);

subjectRouter.get("/", isAdminLogin, isAdmin, getSubjectsCtrl);

subjectRouter
  .route("/:id")
  .get(isAdminLogin, isAdmin, getSubjectCtrl)
  .put(isAdminLogin, isAdmin, updateSubjectCtrl)
  .delete(isAdminLogin, isAdmin, deleteSubjectCtrl);

module.exports = subjectRouter;
