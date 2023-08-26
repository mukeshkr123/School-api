const expressAsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const ClassLevel = require("../../model/Academic/ClassLevel");

//@desc     Create Class Level
//@route    POST /api/v1/class-levels
//@access   Private
exports.createClassLevel = expressAsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  // check if exits
  const classLevel = await ClassLevel.findOne({ name });
  if (classLevel) {
    throw new Error("Class Level Exists");
  }
  //create
  const classLevelCreated = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });
  // push Class Level into
  const admin = await Admin.findById(req.userAuth._id);
  admin.classLevels.push(classLevelCreated._id);
  //save
  await admin.save();
  res.status(201).json({
    status: "success",
    message: "Class Level created successfully",
    data: classLevelCreated,
  });
});

//@desc     Fetch Class Levels
//@route    GET /api/v1/class-levels
//@access   Private
exports.getAllClassLevelsCtrl = expressAsyncHandler(async (req, res) => {
  const ClassLevels = await ClassLevel.find();
  res.status(200).json({
    status: "success",
    message: "Fetched all Class Level successfully",
    data: ClassLevels,
  });
});

//@desc     Fetch single  Class Level
//@route    GET /api/v1/class-levels/:id
//@access   Private
exports.getClassLevelCtrl = expressAsyncHandler(async (req, res) => {
  const ClassLevels = await ClassLevel.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Fetched Single Class Level successfully",
    data: ClassLevels,
  });
});

//@desc     update Class Level
//@route    PUT /api/v1/class-levels/:id
//@access   Private
exports.updateClassLevelCtrl = expressAsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  // check if name exist
  const ClassLevelFind = await ClassLevel.findOne({ name });
  if (ClassLevelFind) {
    throw new Error("Class Level already exists");
  }
  const updateClassLevels = await ClassLevel.findByIdAndUpdate(req.params.id, {
    name,
    description,
  });
  res.status(200).json({
    status: "success",
    message: "updated Class Level successfully",
    data: updateClassLevels,
  });
});

//@desc     delete Class Level
//@route    DELETE /api/v1/class-levels/:id
//@access   Private
exports.deleteClassLevelCtrl = expressAsyncHandler(async (req, res) => {
  await ClassLevel.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Class Level deleted  successfully",
  });
});
