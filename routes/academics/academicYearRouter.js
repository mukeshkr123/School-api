const express = require("express");
const {
  createAcademicYear,
  getAllAcademicYearsCtrl,
  getAcademicYearCtrl,
  updateAcademicYearCtrl,
  deleteAcademicYearCtrl,
} = require("../../controller/Academics/academicYearCtrl");
const isLogin = require("../../middlewares/isLoggedin");
const isAdmin = require("../../middlewares/isAdmin");
const academicYearRouter = express.Router();

//create academic
academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);

// get all academic year
academicYearRouter.get("/", isLogin, isAdmin, getAllAcademicYearsCtrl);

//get single academic year
academicYearRouter.get("/:id", isLogin, isAdmin, getAcademicYearCtrl);

// update academic  year
academicYearRouter.put("/:id", isLogin, isAdmin, updateAcademicYearCtrl);

//delete academic year
academicYearRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYearCtrl);

module.exports = academicYearRouter;
