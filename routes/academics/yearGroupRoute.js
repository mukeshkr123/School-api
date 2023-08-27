const express = require("express");
const {
  createYearGroup,
  deleteYearGroup,
  getYearGroup,
  getYearGroups,
  updateYearGroup,
} = require("../../controller/Academics/yearGroupCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isAdminLogin = require("../../middlewares/isAdminLoggedin");

const yearGroupRouter = express.Router();

yearGroupRouter
  .route("/")
  .post(isAdminLogin, isAdmin, createYearGroup)
  .get(isAdminLogin, isAdmin, getYearGroups);

yearGroupRouter
  .route("/:id")
  .get(isAdminLogin, isAdmin, getYearGroup)
  .put(isAdminLogin, isAdmin, updateYearGroup)
  .delete(isAdminLogin, isAdmin, deleteYearGroup);

module.exports = yearGroupRouter;
