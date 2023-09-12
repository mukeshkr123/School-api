const expressAsyncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Question = require("../../model/Academic/Questions");

//@desc  Create Question
//@route POST /api/v1/question/:examID
//@acess  Private Teacher only

exports.CreateQuestion = expressAsyncHandler(async (req, res) => {
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
