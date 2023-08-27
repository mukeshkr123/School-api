const express = require("express");
const {
  adminRegisterTeacher,
  loginTeacher,
} = require("../../controller/staff/teacherCtrl");

const isAdmin = require("../../middlewares/isAdmin");
const isAdminLogin = require("../../middlewares/isAdminLoggedin");

const teachersRouter = express.Router();

teachersRouter.post(
  "/admin/register",
  isAdminLogin,
  isAdmin,
  adminRegisterTeacher
);
teachersRouter.post("/login", loginTeacher);

module.exports = teachersRouter;
