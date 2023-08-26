const expressAsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const Subject = require("../../model/Academic/Subject");
const Program = require("../../model/Academic/Program");

//@desc     Create Subject
//@route    POST /api/v1/subject/:programID
//@access   Private
exports.createSubject = expressAsyncHandler(async (req, res) => {
  const { name, description, academicTerm, duration } = req.body;

  // Find the program using the provided programID
  const programFound = await Program.findById(req.params.programID);
  if (!programFound) throw new Error("Program not found");

  // Check if the subject with the given name already exists
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) throw new Error("Subject already exists");

  // Create the new subject
  const subjectCreated = await Subject.create({
    name,
    description,
    duration,
    academicTerm,
    createdBy: req.userAuth._id,
  });

  // Associate the new subject with the program
  programFound.subjects.push(subjectCreated._id);
  await programFound.save();

  // Send a success response
  res.status(201).json({
    status: "success",
    message: "Subject created successfully",
    data: subjectCreated,
  });
});

//@desc     Fetch all subjects
//@route    GET /api/v1/subjects
//@access   Private
exports.getSubjectsCtrl = expressAsyncHandler(async (req, res) => {
  // Retrieve all subjects from the database
  const subjects = await Subject.find();
  res.status(200).json({
    status: "success",
    message: "Fetched all subjects successfully",
    data: subjects,
  });
});

//@desc     Fetch single subject
//@route    GET /api/v1/subjects/:id
//@access   Private
exports.getSubjectCtrl = expressAsyncHandler(async (req, res) => {
  // Retrieve a single subject based on the provided subject ID
  const subject = await Subject.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Fetched Single Subject successfully",
    data: subject,
  });
});

//@desc     Update subject
//@route    PUT /api/v1/subject/:id
//@access   Private
exports.updateSubjectCtrl = expressAsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;

  // Check if a subject with the updated name already exists
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) throw new Error("Subject already exists");

  // Update the subject with the provided ID
  const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, {
    name,
    description,
    academicTerm,
  });

  // Send a success response
  res.status(200).json({
    status: "success",
    message: "Updated Subject successfully",
    data: updatedSubject,
  });
});

//@desc     Delete Subject
//@route    DELETE /api/v1/subjects/:id
//@access   Private
exports.deleteSubjectCtrl = expressAsyncHandler(async (req, res) => {
  // Delete the subject based on the provided subject ID
  await Subject.findByIdAndDelete(req.params.id);

  // Send a success response
  res.status(201).json({
    status: "success",
    message: "Subject deleted successfully",
  });
});
