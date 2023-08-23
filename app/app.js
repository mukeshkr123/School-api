const express = require("express");
const morgan = require("morgan");
const adminRouter = require("../routes/staffs/adminRoute");
const app = express();

//Middleware
app.use(express.json()); // pass incoming json data
app.use(morgan("dev"));

//Routes
//Admin Router
app.use("/api/v1/admins", adminRouter);

module.exports = app;
