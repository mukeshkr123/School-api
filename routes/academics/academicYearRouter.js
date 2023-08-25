const express = require("express");
const {
  createAcademicYear,
  getAllAcademicYearCtrl,
} = require("../../controller/Academics/academicYearCtrl");
const isLogin = require("../../middlewares/isLoggedin");
const isAdmin = require("../../middlewares/isAdmin");
const academicYearRouter = express.Router();

//create academic
academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);

academicYearRouter.get("/", isLogin, isAdmin, getAllAcademicYearCtrl);

module.exports = academicYearRouter;
