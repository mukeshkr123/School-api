const express = require("express");
const {
  createProgram,
  getAllProgramsCtrl,
  getProgramCtrl,
  updateProgramCtrl,
  deleteProgramCtrl,
} = require("../../controller/Academics/programCtrl");
createProgram;
const isLogin = require("../../middlewares/isLoggedin");
const isAdmin = require("../../middlewares/isAdmin");
const ProgramRouter = express.Router();

ProgramRouter.route("/")
  .post(isLogin, isAdmin, createProgram)
  .get(isLogin, isAdmin, getAllProgramsCtrl);

ProgramRouter.route("/:id")
  .get(isLogin, isAdmin, getProgramCtrl)
  .put(isLogin, isAdmin, updateProgramCtrl)
  .delete(isLogin, isAdmin, deleteProgramCtrl);

module.exports = ProgramRouter;
