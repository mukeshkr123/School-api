const express = require("express");
const morgan = require("morgan");
const app = express();

//Middleware
app.use(morgan("dev"));

//Routes

//Admin Register
app.post("/api/v1/admins/register", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admin has created ",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

//Admin login
app.post("/api/v1/admins/login", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Login successfully",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

//Get all admins
app.get("/api/v1/admins/login", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "All admin ",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

//single Admin
app.get("/api/v1/admins/:id", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "single admin ",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

// update admin
app.put("/api/v1/admins/:id", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "update admin ",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

// admin delete
app.delete("/api/v1/admins/:id", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "delete admin ",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

//admin suspending teacher
app.put("/api/v1/admins/suspend/teacher/:id", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin suspending teacher ",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

//admin unsuspending teacher
app.put("/api/v1/admins/unsuspend/teacher/:id", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin unsuspending teacher ",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

//admin unsuspending teacher
app.put("/api/v1/admins/unsuspend/teacher/:id", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin unsuspending teacher ",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

//admin withdrawing teacher
app.put("/api/v1/admins/withdraw/teacher/:id", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin withdraw teacher ",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

//admin unwithdrawing teacher
app.put("/api/v1/admins/unwithdraw/teacher/:id", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin unwithdraw teacher ",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

//admin publish exam result teacher
app.put("/api/v1/admins/publish/exam/:id", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin publish exam  ",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

//admin unpublish exam result teacher
app.put("/api/v1/admins/unpublish/exam/:id", (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin unpublish exam  ",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
});

module.exports = app;
