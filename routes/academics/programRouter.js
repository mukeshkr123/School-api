const express = require("express");
const {
  createProgram,
  getAllProgramsCtrl,
  getProgramCtrl,
  updateProgramCtrl,
  deleteProgramCtrl,
} = require("../../controller/Academics/programCtrl");
createProgram;
const isAdmin = require("../../middlewares/isAdmin");
const isAdminLogin = require("../../middlewares/isAdminLoggedin");
const ProgramRouter = express.Router();

ProgramRouter.route("/")
  .post(isAdminLogin, isAdmin, createProgram)
  .get(isAdminLogin, isAdmin, getAllProgramsCtrl);

ProgramRouter.route("/:id")
  .get(isAdminLogin, isAdmin, getProgramCtrl)
  .put(isAdminLogin, isAdmin, updateProgramCtrl)
  .delete(isAdminLogin, isAdmin, deleteProgramCtrl);

module.exports = ProgramRouter;
