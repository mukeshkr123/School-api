const expressAsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const Program = require("../../model/Academic/Program");

//@desc     Create Programs
//@route    POST /api/v1/programs
//@access   Private
exports.createProgram = expressAsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  // check if exits
  const program = await Program.findOne({ name });
  if (program) {
    throw new Error("Programs Exists");
  }
  //create
  const ProgramCreated = await Program.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });
  // push Programs into
  const admin = await Admin.findById(req.userAuth._id);
  admin.programs.push(ProgramCreated._id);
  //save
  await admin.save();
  res.status(201).json({
    status: "success",
    message: "Programs created successfully",
    data: ProgramCreated,
  });
});

//@desc     Fetch Programss
//@route    GET /api/v1/programs
//@access   Private
exports.getAllProgramsCtrl = expressAsyncHandler(async (req, res) => {
  const programs = await Program.find();
  res.status(200).json({
    status: "success",
    message: "Fetched all Programs successfully",
    data: programs,
  });
});

//@desc     Fetch single  Programs
//@route    GET /api/v1/programs/:id
//@access   Private
exports.getProgramCtrl = expressAsyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Fetched Single Programs successfully",
    data: program,
  });
});

//@desc     update Programs
//@route    PUT /api/v1/programs/:id
//@access   Private
exports.updateProgramCtrl = expressAsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  // check if name exist
  const paramsrogramFind = await Program.findOne({ name });
  if (paramsrogramFind) {
    throw new Error("Programs already exists");
  }
  const updatePrograms = await Program.findByIdAndUpdate(req.params.id, {
    name,
    description,
  });
  res.status(200).json({
    status: "success",
    message: "updated Programs successfully",
    data: updatePrograms,
  });
});

//@desc     delete Programs
//@route    DELETE /api/v1/programs/:id
//@access   Private
exports.deleteProgramCtrl = expressAsyncHandler(async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Programs deleted  successfully",
  });
});
