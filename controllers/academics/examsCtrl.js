import asyncHandler from "express-async-handler";
import { Teacher } from "./../../models/Staff/Teacher.js";
import { Exam } from "../../models/Academic/Exam.js";

// @ Desk Create Exam
// @ Route POST api/v1/exams
// @ Access Private Teachers Only

export const createExam = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    classLevel,
    examTime,
    examType,
    createdBy,
    academicYear,
  } = req.body;

  //   Find the teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id);

  if (!teacherFound) {
    throw new Error("Teacher Found");
  }

  // Find the exam exist
  const examExist = await Exam.findById(req.userAuth._id);
  if (examExist) {
    throw new Error("Exam already Exist.");
  }

  // Create Exam

  const createdExam = await new Exam({
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    classLevel,
    createdBy: req.userAuth._id,
    academicYear,
  });

  // push the exam into teacher

  teacherFound.examCreated.push(createdExam);

  // Save
  await createdExam.save();
  await teacherFound.save();

  res.status(201).json({
    success: true,
    message: "Teacher registered Successfully",
    createdExam,
  });
});

// @ Desk Get All Exams
// @ Route GET api/v1/exams
// @ Access Private
export const getExamsCtrl = asyncHandler(async (req, res) => {
  const exams = await Exam.find().populate({
    path: "questions",
    populate: {
      path: "createdBy",
    },
  });

  res.status(200).json({
    status: "Success",
    message: "Exams Featched Successfully.",
    data: exams,
  });
});

// @ Desk Get Single Exam
// @ Route GET api/v1/exams/:examID
// @ Access Private Teachers Only
export const getExamCtrl = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.examID);

  res.status(200).json({
    status: "Success",
    message: "Exam Featched Successfully.",
    data: exam,
  });
});

// @ Desk Update Exam
// @ Route PUT api/v1/exams/:examID
// @ Access Private Teachers Only

export const updateExamCtrl = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    classLevel,
    examTime,
    examType,
    createdBy,
    academicYear,
  } = req.body;

  //  Check if Subject exist already

  const creatingExamFound = await Exam.findOne({ name });

  if (creatingExamFound) {
    throw new Error("Updating Exam is Already Exist");
  }

  const updatedExam = await Exam.findByIdAndUpdate(
    req.params.examID,
    {
      name,
      description,
      subject,
      program,
      academicTerm,
      duration,
      examDate,
      classLevel,
      examTime,
      createdBy: req.userAuth._id,
      examType,
      academicYear,
    },
    { new: true }
  );

  res.status(201).json({
    status: "Success",
    message: "Exam Updated Successfully.",
    data: updatedExam,
  });
});

// @ Desk Delete Exam
// @ Route DELETE api/v1/exams/:examID
// @ Access Private Teachers Only
export const deleteExamCtrl = asyncHandler(async (req, res) => {
  await Exam.findByIdAndDelete(req.params.examID);

  res.status(201).json({
    status: "Success",
    message: "Exam Deleted Successfully.",
  });
});
