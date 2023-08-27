const express = require("express");
const {
  createClassLevel,
  getAllClassLevelsCtrl,
  getClassLevelCtrl,
  updateClassLevelCtrl,
  deleteClassLevelCtrl,
} = require("../../controller/Academics/classLevelCtrl");
createClassLevel;
const isAdmin = require("../../middlewares/isAdmin");
const isAdminLogin = require("../../middlewares/isAdminLoggedin");
const classLevelRouter = express.Router();

classLevelRouter
  .route("/")
  .post(isAdminLogin, isAdmin, createClassLevel)
  .get(isAdminLogin, isAdmin, getAllClassLevelsCtrl);

classLevelRouter
  .route("/:id")
  .get(isAdminLogin, isAdmin, getClassLevelCtrl)
  .put(isAdminLogin, isAdmin, updateClassLevelCtrl)
  .delete(isAdminLogin, isAdmin, deleteClassLevelCtrl);

module.exports = classLevelRouter;
