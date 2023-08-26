const express = require("express");
const cors = require("cors");

const {
  notFoundErr,
  globalErrHandler,
} = require("../middlewares/globalErrorHandler");
const adminRouter = require("../routes/staffs/adminRouter");
const academicYearRouter = require("../routes/academics/academicYearRouter");
const academicTermRouter = require("../routes/academics/academicTermRouter ");
const classLevelRouter = require("../routes/academics/classLevelRouter");
const ProgramRouter = require("../routes/academics/programRouter");

const app = express();

//Middlewares
app.use(express.json()); //pass incoming json data
//cors
app.use(cors());

//Routes
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/acdemic-years", academicYearRouter);
app.use("/api/v1/acdemic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", ProgramRouter);

//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
