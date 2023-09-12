const AsyncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Question = require("../../model/Academic/Questions");

//@desc  Create Question
//@route POST /api/v1/questions/:examID
//@acess  Private Teacher only

exports.CreateQuestion = AsyncHandler(async (req, res) => {
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy,
  } = req.body;

  //find the exam
  const examFound = await Exam.findById(req.params.examId);
  if (!examFound) {
    throw new Error("Exam not found");
  }
  //check if question exist;
  const questionExist = await Question.findOne({ question });
  if (questionExist) {
    throw new Error("Question already exist");
  }
  //create exam
  const questionCreated = await Question.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.userAuth._id,
  });

  // add the question to the exam
  examFound.questions.push(questionCreated._id);
  //save
  await examFound.save();
  res.status(201).json({
    status: "success",
    message: "Question created successfully",
    data: questionCreated,
  });
});

//@desc  Get all questions
//@route POST /api/v1/questions
//@acess  Private Teacher only

exports.GetAllQuestions = AsyncHandler(async (req, res) => {
  const questions = await Question.find();
  res.status(201).json({
    status: "success",
    message: "Questions fetched successfully",
    data: questions,
  });
});
