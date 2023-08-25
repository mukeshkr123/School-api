const expressAsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");

//@desc     Create Academic year
//@route    POST /api/v1/academic-years
//@access   Private
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

//@desc     Fetch Academic years
//@route    GET /api/v1/academic-years
//@access   Private
exports.getAllAcademicYearsCtrl = expressAsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find();
  res.status(200).json({
    status: "success",
    message: "Fetched all academic year successfully",
    data: academicYears,
  });
});

//@desc     Fetch single  Academic year
//@route    GET /api/v1/academic-years/:id
//@access   Private
exports.getAllAcademicYearCtrl = expressAsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Fetched Single academic year successfully",
    data: academicYears,
  });
});