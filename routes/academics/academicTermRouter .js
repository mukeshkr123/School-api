const express = require("express");
const {
  createAcademicTerm,
  getAllAcademicTermsCtrl,
  getAcademicTermCtrl,
  updateAcademicTermCtrl,
  deleteAcademicTermCtrl,
} = require("../../controller/Academics/academicTermCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isAdminLogin = require("../../middlewares/isAdminLoggedin");
const academicTermRouter = express.Router();

// //create academic
// academicTermRouter.post("/", isAdminLogin, isAdmin, createAcademicTerm);

// // get all academic Term
// academicTermRouter.get("/", isAdminLogin, isAdmin, getAllAcademicTermsCtrl);

academicTermRouter
  .route("/")
  .post(isAdminLogin, isAdmin, createAcademicTerm)
  .get(isAdminLogin, isAdmin, getAllAcademicTermsCtrl);

academicTermRouter
  .route("/:id")
  .get(isAdminLogin, isAdmin, getAcademicTermCtrl)
  .put(isAdminLogin, isAdmin, updateAcademicTermCtrl)
  .delete(isAdminLogin, isAdmin, deleteAcademicTermCtrl);

// //get single academic Term
// academicTermRouter.get("/:id", isAdminLogin, isAdmin, getAcademicTermCtrl);

// // update academic  Term
// academicTermRouter.put("/:id", isAdminLogin, isAdmin, updateAcademicTermCtrl);

// //delete academic Term
// academicTermRouter.delete("/:id", isAdminLogin, isAdmin, deleteAcademicTermCtrl);

module.exports = academicTermRouter;
