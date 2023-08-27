const express = require("express");
const {
  createAcademicYear,
  getAllAcademicYearsCtrl,
  getAcademicYearCtrl,
  updateAcademicYearCtrl,
  deleteAcademicYearCtrl,
} = require("../../controller/Academics/academicYearCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isAdminLogin = require("../../middlewares/isAdminLoggedin");
const academicYearRouter = express.Router();

// //create academic
// academicYearRouter.post("/", isAdminLogin, isAdmin, createAcademicYear);

// // get all academic year
// academicYearRouter.get("/", isAdminLogin, isAdmin, getAllAcademicYearsCtrl);

academicYearRouter
  .route("/")
  .post(isAdminLogin, isAdmin, createAcademicYear)
  .get(isAdminLogin, isAdmin, getAllAcademicYearsCtrl);

// //get single academic year
// academicYearRouter.get("/:id", isAdminLogin, isAdmin, getAcademicYearCtrl);

// // update academic  year
// academicYearRouter.put("/:id", isAdminLogin, isAdmin, updateAcademicYearCtrl);

// //delete academic year
// academicYearRouter.delete("/:id", isAdminLogin, isAdmin, deleteAcademicYearCtrl);

academicYearRouter
  .route("/:id")
  .get(isAdminLogin, isAdmin, getAcademicYearCtrl)
  .put(isAdminLogin, isAdmin, updateAcademicYearCtrl)
  .delete(isAdminLogin, isAdmin, deleteAcademicYearCtrl);

module.exports = academicYearRouter;
