const express = require("express");

const isAdmin = require("../../middlewares/isAdmin");
const isAdminLogin = require("../../middlewares/isAdminLoggedin");
const {
  adminRegisterStudent,
} = require("../../controller/students/studentsCtrl");

const studentsRouter = express.Router();

studentsRouter.post(
  "/admin/register",
  isAdminLogin,
  isAdmin,
  adminRegisterStudent
);

module.exports = studentsRouter;
