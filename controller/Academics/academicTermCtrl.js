const expressAsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const AcademicTerm = require("../../model/Academic/AcademicTerm");

//@desc     Create AcademicTerm Term
//@route    POST /api/v1/academic-terms
//@access   Private
exports.createAcademicTerm = expressAsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  // check if exits
  const academicTerm = await AcademicTerm.findOne({ name });
  if (academicTerm) {
    throw new Error("Academic Term Exists");
  }
  //create
  const academicTermCreated = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });
  // push academic Term into
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicTerms.push(academicTermCreated._id);
  await admin.save();
  res.status(201).json({
    status: "success",
    message: "Academic Term created successfully",
    data: academicTermCreated,
  });
});

//@desc     Fetch Academic Terms
//@route    GET /api/v1/academic-Terms
//@access   Private
exports.getAllAcademicTermsCtrl = expressAsyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find();
  res.status(200).json({
    status: "success",
    message: "Fetched all academic Terms successfully",
    data: academicTerms,
  });
});

//@desc     Fetch single Academic Term
//@route    GET /api/v1/academic-Terms/:id
//@access   Private
exports.getAcademicTermCtrl = expressAsyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Fetched Single academic Term successfully",
    data: academicTerm,
  });
});

//@desc     update Academic Term
//@route    PUT /api/v1/academic-Terms/:id
//@access   Private
exports.updateAcademicTermCtrl = expressAsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  // check if name exist
  const academicTermFind = await AcademicTerm.findOne({ name });
  if (academicTermFind) {
    throw new Error("Academic Term already exists");
  }
  const updateAcademicTerm = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      duration,
    }
  );
  res.status(200).json({
    status: "success",
    message: "updated academic Term successfully",
    data: updateAcademicTerm,
  });
});

//@desc     delete Academic Term
//@route    DELETE /api/v1/academic-Terms/:id
//@access   Private
exports.deleteAcademicTermCtrl = expressAsyncHandler(async (req, res) => {
  await AcademicTerm.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Academic Term deleted  successfully",
  });
});
