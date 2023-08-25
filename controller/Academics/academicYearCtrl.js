const expressAsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");

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
  // push academic year into
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicYears.push(academicYearCreated._id);
  await admin.save();
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
exports.getAcademicYearCtrl = expressAsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Fetched Single academic year successfully",
    data: academicYears,
  });
});

//@desc     update Academic year
//@route    PUT /api/v1/academic-years/:id
//@access   Private
exports.updateAcademicYearCtrl = expressAsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  // check if name exist
  const academicYearFind = await AcademicYear.findOne({ name });
  if (academicYearFind) {
    throw new Error("Academic year already exists");
  }
  const updateAcademicYears = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    {
      name,
      fromYear,
      toYear,
    }
  );
  res.status(200).json({
    status: "success",
    message: "updated academic year successfully",
    data: updateAcademicYears,
  });
});

//@desc     delete Academic year
//@route    DELETE /api/v1/academic-years/:id
//@access   Private
exports.deleteAcademicYearCtrl = expressAsyncHandler(async (req, res) => {
  await AcademicYear.findByIdAndDelete(req.body.id);
  res.status(201).json({
    status: "success",
    message: "Academic year deleted  successfully",
  });
});
