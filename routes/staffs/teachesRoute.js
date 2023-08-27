const express = require("express");
const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTechersAdmin,
  getTecherByAdmin,
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
teachersRouter.get("/admin", isAdminLogin, isAdmin, getAllTechersAdmin);
teachersRouter.get(
  "/:teacherID/admin",
  isAdminLogin,
  isAdmin,
  getTecherByAdmin
);

module.exports = teachersRouter;
