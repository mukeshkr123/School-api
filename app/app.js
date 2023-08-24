const express = require("express");
const morgan = require("morgan");
const adminRouter = require("../routes/staffs/adminRoute");
const app = express();

//Middleware
app.use(express.json()); // pass incoming json data
app.use(morgan("dev"));

//Error handler
app.use((err, req, res, next) => {
  //status
  //message
  // stack
  const stack = err.stack;
  const message = err.message;
  const status = err.status ? err.status : "failed";
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status.json({
    status,
    message,
    stack,
  });
});

//Routes
//Admin Router
app.use("/api/v1/admins", adminRouter);

module.exports = app;
