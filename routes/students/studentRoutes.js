const express = require("express");

const isAdmin = require("../../middlewares/isAdmin");
const isAdminLogin = require("../../middlewares/isAdminLoggedin");
const {
  adminRegisterStudent,
  loginStudent,
  getStudentProfile,
  getAllStudentsAdmin,
  getStudentsByAdmin,
  studentUpdateProfile,
} = require("../../controller/students/studentsCtrl");
const isStudentLogin = require("../../middlewares/isStudentLogin");
const isStudent = require("../../middlewares/isStudent");

const studentsRouter = express.Router();

studentsRouter.post(
  "/admin/register",
  isAdminLogin,
  isAdmin,
  adminRegisterStudent
);
studentsRouter.post("/login", isAdminLogin, isAdmin, loginStudent);
studentsRouter.get("/profile", isStudentLogin, getStudentProfile);
studentsRouter.get("/admin", isAdminLogin, isAdmin, getAllStudentsAdmin);
studentsRouter.get(
  "/:studentID/admin",
  isAdminLogin,
  isAdmin,
  getStudentsByAdmin
);
studentsRouter.get(
  "/:studentID/admin",
  isAdminLogin,
  isAdmin,
  getStudentsByAdmin
);
studentsRouter.put(
  "/:studentID/update",
  isStudentLogin,
  isStudent,
  studentUpdateProfile
);

module.exports = studentsRouter;
