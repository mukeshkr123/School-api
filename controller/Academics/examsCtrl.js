const AsyncHandler = require("express-async-handler");
const Teacher = require("../../model/Academic/Teacher");
const Exam = require("../../model/Academic/Exam");

//@desc     Create exam
//@route    POST /api/v1/exams
//@access   Private tecaher only

exports.createExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    academicTerm,
    academicYear,
    classLevel,
    createdBy,
    duration,
    examDate,
    examStatus,
    examTime,
    examType,
    subject,
    program,
  } = req.body;

  // find teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id);
  if (!teacherFound) {
    throw new Error("Teacher not found");
  }

  //check exam exists
  const examExists = await Exam.findOne({ name });
  if (examExists) {
    throw new Error("Exam already exist");
  }

  //create
  const examCreated = await new Exam({
    name,
    description,
    academicTerm,
    academicYear,
    classLevel,
    createdBy,
    duration,
    examDate,
    examStatus,
    examTime,
    examType,
    subject,
    program,
    createdBy: req.userAuth._id,
  });
  // push the exam into teacher
  teacherFound.examsCreated.push(examCreated._id);
  //save the exam
  await examCreated.save();
  await teacherFound.save();
  res.status(201).json({
    status: "success",
    message: "Exam created successfully",
    data: examCreated,
  });
});

//@desc     get all exams
//@route    GEt /api/v1/exams
//@access   Private tecaher only

exports.getExams = AsyncHandler(async (req, res) => {
  const exams = await Exam.find().populate({
    path: "questions",
    populate: {
      path: "createdBy",
    },
  });
  res.status(201).json({
    status: "success",
    message: "Feteched exam successfully",
    data: exams,
  });
});

//@desc     get single exams
//@route    GEt /api/v1/exams/:id
//@access   Private tecaher only
exports.getExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Feteched exam successfully",
    data: exam,
  });
});

//@desc     update exam
//@route    PUT /api/v1/exams/:id
//@access   Private teacher only

exports.updateExam = AsyncHandler(async (req, res) => {
  const examId = req.params.id; // Extract the exam ID from the request parameters

  const {
    name,
    description,
    academicTerm,
    academicYear,
    classLevel,
    duration,
    examDate,
    examStatus,
    examTime,
    examType,
    subject,
    program,
  } = req.body;

  // check if already exists
  const nameExist = await Exam.findOne({ name });
  if (nameExist) {
    throw new Error("Name Exists");
  }

  const updatedExam = await Exam.findByIdAndUpdate(
    examId,
    {
      name,
      description,
      academicTerm,
      academicYear,
      classLevel,
      duration,
      examDate,
      examStatus,
      examTime,
      examType,
      subject,
      program,
    },
    {
      new: true, // Return the updated document
      runValidators: true, // Run validation on updates
    }
  );

  if (!updatedExam) {
    return res.status(404).json({ status: "error", message: "Exam not found" });
  }

  res.status(200).json({
    status: "success",
    message: "Exam updated successfully",
    data: updatedExam,
  });
});
