const express = require("express");
const {
  createAcademicTerm,
  getAllAcademicTermsCtrl,
  getAcademicTermCtrl,
  updateAcademicTermCtrl,
  deleteAcademicTermCtrl,
} = require("../../controller/Academics/academicTermCtrl");
const isLogin = require("../../middlewares/isLoggedin");
const isAdmin = require("../../middlewares/isAdmin");
const academicTermRouter = express.Router();

// //create academic
// academicTermRouter.post("/", isLogin, isAdmin, createAcademicTerm);

// // get all academic Term
// academicTermRouter.get("/", isLogin, isAdmin, getAllAcademicTermsCtrl);

academicTermRouter
  .route("/")
  .post(isLogin, isAdmin, createAcademicTerm)
  .get(isLogin, isAdmin, getAllAcademicTermsCtrl);

academicTermRouter
  .route("/:id")
  .get(isLogin, isAdmin, getAcademicTermCtrl)
  .put(isLogin, isAdmin, updateAcademicTermCtrl)
  .delete(isLogin, isAdmin, deleteAcademicTermCtrl);

// //get single academic Term
// academicTermRouter.get("/:id", isLogin, isAdmin, getAcademicTermCtrl);

// // update academic  Term
// academicTermRouter.put("/:id", isLogin, isAdmin, updateAcademicTermCtrl);

// //delete academic Term
// academicTermRouter.delete("/:id", isLogin, isAdmin, deleteAcademicTermCtrl);

module.exports = academicTermRouter;
