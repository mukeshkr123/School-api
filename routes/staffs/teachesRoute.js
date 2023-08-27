const express = require("express");
const {
  adminRegisterTeacher,
  loginTeacher,
} = require("../../controller/staff/teacherCtrl");
const isLogin = require("../../middlewares/isLoggedin");
const isAdmin = require("../../middlewares/isAdmin");

const teachersRouter = express.Router();

teachersRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teachersRouter.post("/login", loginTeacher);

module.exports = teachersRouter;
