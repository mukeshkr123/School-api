const express = require("express");
const {
  createClassLevel,
  getAllClassLevelsCtrl,
  getClassLevelCtrl,
  updateClassLevelCtrl,
  deleteClassLevelCtrl,
} = require("../../controller/Academics/classLevelCtrl");
createClassLevel;
const isLogin = require("../../middlewares/isLoggedin");
const isAdmin = require("../../middlewares/isAdmin");
const classLevelRouter = express.Router();

classLevelRouter
  .route("/")
  .post(isLogin, isAdmin, createClassLevel)
  .get(isLogin, isAdmin, getAllClassLevelsCtrl);

classLevelRouter
  .route("/:id")
  .get(isLogin, isAdmin, getClassLevelCtrl)
  .put(isLogin, isAdmin, updateClassLevelCtrl)
  .delete(isLogin, isAdmin, deleteClassLevelCtrl);

module.exports = classLevelRouter;
