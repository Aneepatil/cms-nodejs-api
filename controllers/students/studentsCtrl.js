import asyncHandler from "express-async-handler";
import { decryptPassword, encryptPassword } from "../../utils/helper.js";
import { generateToken } from "../../utils/generateToken.js";
import { Student } from "./../../models/Students/Student.js";
import { Exam } from "../../models/Academic/Exam.js";
import { ExamResult } from "./../../models/Academic/ExamResults.js";
import { Admin } from "../../models/Staff/Admin.js";

// @ Desk Register Student
// @ Route POST api/v1/students/admin/register
// @ Access Private

export const adminRegisterStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Find the admin
  const admin = await Admin.findById(req.userAuth._id);
  if (!admin) {
    throw new Error("Admin not found.");
  }

  // Check if teacher already exist
  const student = await Student.findOne({ email });
  if (student) {
    throw new Error("Student mail id already existed.");
  }

  // Hasing Password
  const hasPassword = await encryptPassword(password);

  const createStudent = await Student.create({
    name,
    email,
    password: hasPassword,
  });

  //  Push teacher into admin model

  admin.students.push(createStudent)
  await admin.save();

  res.status(201).json({
    success: true,
    message: "Student registered Successfully",
    createStudent,
  });
});

// @ Desk Login Students
// @ Route POST api/v1/students/login
// @ Access Public

export const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });
  if (!student) {
    throw new Error("Invalid Login Credentials.");
  }
  const isPassMached = await decryptPassword(password, student.password);

  if (!isPassMached) {
    throw new Error("Invalid Login Credentials.");
  }

  const token = generateToken(student._id);

  const stud = student._doc;

  return res.json({
    status: "Success",
    message: "Student Logged-In Successfully",
    data: { ...stud, token },
  });
});

// @ Desk Get All Students
// @ Route GET api/v1/students/admin
// @ Access Private Admin Only

export const getAllStudentsByAdmin = asyncHandler(async (req, res) => {
  const students = await Student.find();

   // Finding the total count of teachers
   const totalstudents = await Student.countDocuments()

  return res.json({
    status: "Success",
    message: "Teacher Logged-In Successfully",
    totalstudents,
    data: students,
  });
});

// @ Desk Get Single Students
// @ Route GET api/v1/students/:studentID/admin
// @ Access Private Admin Only

export const getStudentByAdmin = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.studentID);

  return res.json({
    status: "Success",
    message: "Admin Fetched Student Successfully",
    data: student,
  });
});

// @ Desk Students Profile
// @ Route GET api/v1/students/profile
// @ Access Private Students Only

export const getStudentProfile = asyncHandler(async (req, res) => {
  // Fins the Student by Admin
  const student = await Student.findById(req.userAuth?._id)
    .select("-password -createdAt -updatedAt")
    .populate("examResults");

  if (!student) throw new Error("Student not found");

  // Get the student profile
  const studentProfile = {
    name: student?.name,
    email: student?.email,
    currentClassLevel: student?.currentClassLevel,
    program: student?.program,
    dateAdmitted: student?.dateAdmitted,
    isSuspended: student?.isSuspended,
    isWithdrawn: student?.isWithdrawn,
    studentId: student?.studentId,
    prefectName: student?.prefectName,
  };

  // Get student Exam Result
  const examResult = student?.examResults;
  // get the current exam
  const currentExamResult = examResult[examResult.length - 1];
  // Find if exam result is published
  const isPublished = currentExamResult?.isPublished;

  return res.json({
    status: "Success",
    message: "Student Featched Successfully",
    data: {
      studentProfile,
      currentExamResult: isPublished ? currentExamResult : [],
    },
  });
});

// @ Desk Student Profile Update
// @ Route PUT api/v1/students/:studentID/update
// @ Access Student Only

export const studentUpadateProfile = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // If email is taken
  const existEmail = await Student.findOne({ email });

  if (existEmail) {
    throw new Error("Email is already taken / exist");
  }

  // Check if admin is updating the password
  if (password) {
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await encryptPassword(password),
      },
      { new: true }
    );

    res.status(201).json({
      status: "Success",
      message: "Teacher upated successfully",
      data: student,
    });
  } else {
    const upadatedStudent = await Student.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
      },
      { new: true }
    );

    res.status(201).json({
      status: "Success",
      message: "Student updated successfully",
      data: upadatedStudent,
    });
  }
});

// @ Desk Admin Update Student Ex:- Assiginig Classes..... etc..
// @ Route PUT api/v1/students/:studentID/update/admin
// @ Access Ptivate Admin Only

export const adminUpadateStudent = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    program,
    classLevels,
    academicYear,
    prefectName,
    isSuspended,
    isWithdrawn,
  } = req.body;

  // Find Student
  const studentFound = await Student.findById(req.params.studentID);

  if (!studentFound) {
    throw new Error("Student Not Found");
  }

  // update Student

  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.studentID,
    {
      $set: {
        name,
        email,
        program,
        academicYear,
        prefectName,
        isSuspended,
        isWithdrawn,
      },
      $addToSet: {
        classLevels,
      },
    },
    { new: true }
  );
  res.status(201).json({
    status: "Success",
    message: "Student updated successfully",
    data: updatedStudent,
  });
});

// @ Desk Student Taking Exam
// @ Route POST api/v1/students/exam/:examID/write
// @ Access Ptivate Student Only

export const writeExamCtrl = asyncHandler(async (req, res) => {
  // Get Student
  const studentFound = await Student.findById(req.userAuth?._id);
  if (!studentFound) {
    throw new Error("Student Not Found");
  }

  // Find the Exam

  const examFound = await Exam.findById(req.params.examID)
    .populate("questions")
    .populate("academicTerm");
  if (!examFound) {
    throw new Error("Exam Not Found");
  }

  //  Get the questions from Exam model
  const questions = examFound?.questions;

  // Get the students answers
  const studentAnswers = req.body.answers;

  // Checking if student answeres all question
  if (studentAnswers.length !== questions.length) {
    throw new Error("You have not answered all questions.");
  }

  //  Checking if student is suspended or withdrawn

  if (studentFound.isWithdrawn || studentFound.isSuspended) {
    throw new Error(
      "You have been Suspended / Withdrawn, you can not take the exam."
    );
  }

  //Checking Student has already taken exam

  const isStudentTakenExam = await ExamResult.findOne({
    student: studentFound?._id,
  });
  if (isStudentTakenExam) {
    throw new Error("You have taken exam already.");
  }

  // Build report Object
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let totalQuestion = questions.length;
  let grade = 0;
  let status = ""; //Failed or Passed
  let score = 0;
  let remarks = "";
  let answeredQuestions = [];

  // Check for answers
  for (let i = 0; i < questions.length; i++) {
    // find the question
    const question = questions[i];

    // Checking if answer is correct with associated questions
    if (question.correctAnswer === studentAnswers[i]) {
      correctAnswers++;
      score++;
      question.isCorrect = true;
    } else {
      wrongAnswers++;
    }
  }

  // Calculate Report

  grade = (correctAnswers / totalQuestion) * 100;
  answeredQuestions = questions.map((question) => {
    return {
      question: question.question,
      correctAnswers: question.correctAnswers,
      isCorrect: question.isCorrect,
    };
  });

  // Set Status
  if (grade >= 50) {
    status = "Pass";
  } else {
    status = "Fail";
  }

  // Set Remarks

  if (grade >= 80) {
    remarks = "Excellent";
  } else if (grade >= 70) {
    remarks = "Very Good";
  } else if (grade >= 60) {
    remarks = "Good";
  } else if (grade >= 50) {
    remarks = "Fair";
  } else {
    remarks = "Poor";
  }

  // Generate Exam Results
  const examResult = await ExamResult.create({
    studentID: studentFound?.studentId,
    exam: examFound._id,
    grade,
    score,
    status,
    remarks,
    classLevel: examFound?.classLevel,
    academicTerm: examFound?.academicTerm,
    academicYear: examFound?.academicYear,
    answeredQuestions: answeredQuestions,
  });

  // Push results into student
  studentFound.examResults.push(examResult);
  // Save the student
  await studentFound.save();

  // Promoting Student class level
  if (
    examFound.academicTerm.name === "2nd Term" &&
    status === "Pass" &&
    studentFound?.currentClassLevel === "Level 100"
  ) {
    // Promote Student to level 200
    studentFound.classLevels.push("Level 200");
    studentFound.currentClassLevel = "Level 200";
    await studentFound.save();
  }

  if (
    // Promote Student to level 300
    examFound.academicTerm.name === "2nd Term" &&
    status === "Pass" &&
    studentFound?.currentClassLevel === "Level 200"
  ) {
    studentFound.classLevels.push("Level 300");
    studentFound.currentClassLevel = "Level 300";
    await studentFound.save();
  }

  if (
    // Promote Student to level 400
    examFound.academicTerm.name === "2nd Term" &&
    status === "Pass" &&
    studentFound?.currentClassLevel === "Level 300"
  ) {
    studentFound.classLevels.push("Level 400");
    studentFound.currentClassLevel = "Level 400";
    await studentFound.save();
  }

  if (
    // Promote Student to level 400
    examFound.academicTerm.name === "2nd Term" &&
    status === "Pass" &&
    studentFound?.currentClassLevel === "Level 400"
  ) {
    studentFound.isGraduated = true;
    studentFound.yearGraduated = new Date();
    await studentFound.save();
  }

  res.status(201).json({
    status: "Success",
    message: "Exam Successfully Submitted",
  });
});
