const express = require("express");
const cors = require("cors");

const {
  notFoundErr,
  globalErrHandler,
} = require("../middlewares/globalErrorHandler");
const academicYearRouter = require("../routes/academics/academicYearRouter");
const academicTermRouter = require("../routes/academics/academicTermRouter ");
const classLevelRouter = require("../routes/academics/classLevelRouter");
const ProgramRouter = require("../routes/academics/programRouter");
const subjectRouter = require("../routes/academics/subjectRoute");
const yearGroupRouter = require("../routes/academics/yearGroupRoute");
const teacherRouter = require("../routes/staffs/teachesRoute");
const examRouter = require("../routes/academics/examRoute");
const adminRouter = require("../routes/staffs/adminRoute");
const studentsRouter = require("../routes/students/studentRoutes");

const app = express();
//Middlewares
app.use(express.json()); //pass incoming json data
//cors
app.use(cors());

//Routes
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", ProgramRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/exams", examRouter);
app.use("/api/v1/students", studentsRouter);

//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
