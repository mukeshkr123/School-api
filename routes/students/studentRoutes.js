const express = require("express");

const isAdmin = require("../../middlewares/isAdmin");
const isAdminLogin = require("../../middlewares/isAdminLoggedin");
const {
  adminRegisterStudent,
  loginStudent,
} = require("../../controller/students/studentsCtrl");

const studentsRouter = express.Router();

studentsRouter.post(
  "/admin/register",
  isAdminLogin,
  isAdmin,
  adminRegisterStudent
);
studentsRouter.post("/admin/login", isAdminLogin, isAdmin, loginStudent);

module.exports = studentsRouter;
