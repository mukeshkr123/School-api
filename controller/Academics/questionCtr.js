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
//@route Get /api/v1/questions
//@acess  Private Teacher only

exports.GetAllQuestions = AsyncHandler(async (req, res) => {
  const questions = await Question.find();
  res.status(201).json({
    status: "success",
    message: "Questions fetched successfully",
    data: questions,
  });
});

//@desc  Get a questions
//@route Get /api/v1/questions/:id
//@acess  Private Teacher only

exports.GetSingleQuestion = AsyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Question fetched successfully",
    data: question,
  });
});

//@desc  update a questions
//@route PUT /api/v1/questions/:id
//@acess  Private Teacher only

exports.UpdateQuestion = AsyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;

  //check question exists or not
  const questionFound = await Question.findOne({ question });
  if (questionFound) {
    throw new Error("Question exists");
  }

  const questionUpdated = await Question.findByIdAndUpdate(
    req.params.id,
    {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      createdBy: req.userAuth.id,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Question updated successfully",
    data: questionUpdated,
  });
});
