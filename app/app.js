const express = require("express");
const cors = require("cors");

const {
  notFoundErr,
  globalErrHandler,
} = require("../middlewares/globalErrorHandler");
const adminRouter = require("../routes/staffs/adminRouter");
const academicYearRouter = require("../routes/academics/academicYearRouter");

const app = express();

//Middlewares
app.use(express.json()); //pass incoming json data
//cors
app.use(cors());

//Routes
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/acdemic-years", academicYearRouter);

//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
