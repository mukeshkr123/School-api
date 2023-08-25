const expressAsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");

exports.createAcademicYear = expressAsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  // check if exits
  const academicYear = await AcademicYear.findOne({ name });
  if (academicYear) {
    throw new Error("Academic Year Exists");
  }
  //create
  const academicYearCreated = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth._id,
  });
  res.status(201).json({
    status: "success",
    message: "Academic year created successfully",
    data: academicYearCreated,
  });
});
