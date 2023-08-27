const express = require("express");
const { adminRegisterTeacher } = require("../../controller/staff/teacherCtrl");
const isLogin = require("../../middlewares/isLoggedin");
const isAdmin = require("../../middlewares/isAdmin");

const teachersRouter = express.Router();

teachersRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);

module.exports = teachersRouter;
