import asyncHandler from "express-async-handler";
import { ExamResult } from "../../models/Academic/ExamResults.js";
import { Student } from "../../models/Students/Student.js";
import { Exam } from "../../models/Academic/Exam.js";

// @ Desk Exam Result Checking
// @ Route GET api/v1/exam-results/:examResultID/checking
// @ Access Private Students Only

export const checkExamResult = asyncHandler(async (req, res) => {
  // Find the Student
  const studentFound = await Student.findById(req.userAuth._id);

  if (!studentFound) {
    throw new Error("Student not found");
  }

  //   find the exam result
  const examResult = await ExamResult.findOne({
    studentID: studentFound?.studentId,
    _id: req.params.examResultID,
  })
    .populate({
      path: "exam",
      populate: {
        path: "questions",
      },
    })
    .populate("classLevel")
    .populate("academicTerm")
    .populate("academicYear");

  //   Check if exam result isPublished
  if (!examResult.isPublished) {
    throw new Error("Exam result is not published.");
  }

  res.json({
    status: "Success",
    message: "Exam result",
    examResult,
  });
});

// @ Desk Get All Exam Result (name, id)
// @ Route GET api/v1/exam-results/
// @ Access Private Students Only

export const getAllExamResult = asyncHandler(async (req, res) => {
  const results = await ExamResult.find().select("exam").populate("exam");
  res.status(200).json({
    status: "Success",
    message: "Results fetched successfully",
    data: results,
  });
});

// @ Desk Get All Exam Result (name, id)
// @ Route PUT api/v1/exam-results/:examResultID/admin-publish
// @ Access Private Students Only

export const adminPublishExamResult = asyncHandler(async (req, res) => {
  const examResult = await ExamResult.findById(req.params.examResultID);
  if (!examResult) {
    throw new Error("Exam Result Not Found.");
  }

  const publishResult = await ExamResult.findByIdAndUpdate(req.params.examResultID, {
    isPublished:req.body.publish,
  },{new:true})
  res.status(200).json({
    status: "Success",
    message: "Exam results updated",
    data: publishResult,
  });
});
