import asyncHandler from "express-async-handler";
import { Exam } from "../../models/Academic/Exam.js";
import { Question } from "../../models/Academic/Questions.js";

// @ Desk Create Questions
// @ Route POST api/v1/questions/:examID
// @ Access Private Teachers Only

export const createQuestion = asyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;

  //   Find the Exam
  const examFound = await Exam.findById(req.params.examID);

  if (!examFound) {
    throw new Error("Exam Not Found.");
  }

  //   Find the Question is exist
  const isQuestionExist = await Question.findOne({ question });

  if (isQuestionExist) {
    throw new Error("Question duplications are not allowed.");
  }

  const createQuestion = await Question.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.userAuth._id,
  });

  //   Push question into Exam

  examFound.questions.push(createQuestion?._id);

  //  Save

  examFound.save();

  res.status(201).json({
    success: true,
    message: "Teacher registered Successfully",
    createQuestion,
  });
});

// @ Desk Ger All Questions
// @ Route POST api/v1/questions/
// @ Access Private Teachers Only
export const getQuestionsCtrl = asyncHandler(async (req, res) => {
  const questions = await Question.find();

  res.status(201).json({
    status: "Success",
    message: "Questions Featched Successfully.",
    data: questions,
  });
});

// @ Desk Ger All Questions
// @ Route POST api/v1/questions/:questionID
// @ Access Private Teachers Only
export const getQuestionCtrl = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.questionID);

  res.status(201).json({
    status: "Success",
    message: "Question Featched Successfully.",
    data: question,
  });
});

// @ Desk Ger All Questions
// @ Route POST api/v1/questions/:questionID
// @ Access Private Teachers Only
export const updateQuestionCtrl = asyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } = req.body;

  //  Check if Question exist already

  const creatingQuestionFound = await Question.findOne({ question });

  if (creatingQuestionFound) {
    throw new Error("Updating Question is Already Exist");
  }

  const updatedQuestion = await Question.findByIdAndUpdate(
    req.params.questionID,
    {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        createdBy: req.userAuth._id,
    },
    { new: true }
  );

  res.status(201).json({
    status: "Success",
    message: "Question Updated Successfully.",
    data: updatedQuestion,
  });
});
