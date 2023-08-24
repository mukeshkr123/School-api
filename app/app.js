const express = require("express");
const cors = require("cors");

const {
  notFoundErr,
  globalErrHandler,
} = require("../middlewares/globalErrorHandler");
const adminRouter = require("../routes/staffs/adminRouter");

const app = express();

//Middlewares
app.use(express.json()); //pass incoming json data
//cors
app.use(cors());

//Routes
app.use("/api/v1/admins", adminRouter);

//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
