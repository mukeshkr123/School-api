const express = require("express");
const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTechersAdmin,
  getTecherByAdmin,
  getTeacherProfile,
} = require("../../controller/staff/teacherCtrl");

const isAdmin = require("../../middlewares/isAdmin");
const isAdminLogin = require("../../middlewares/isAdminLoggedin");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const teachersRouter = express.Router();

teachersRouter.post(
  "/admin/register",
  isAdminLogin,
  isAdmin,
  adminRegisterTeacher
);
teachersRouter.post("/login", loginTeacher);
teachersRouter.get("/admin", isAdminLogin, isAdmin, getAllTechersAdmin);
teachersRouter.get("/profile", isTeacherLogin, isTeacher, getTeacherProfile);

teachersRouter.get(
  "/:teacherID/admin",
  isAdminLogin,
  isAdmin,
  getTecherByAdmin
);

module.exports = teachersRouter;
