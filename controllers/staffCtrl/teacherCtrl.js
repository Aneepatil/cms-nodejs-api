import asyncHandler from "express-async-handler";
import { Teacher } from "./../../models/Staff/Teacher.js";
import { decryptPassword, encryptPassword } from "../../utils/helper.js";
import { generateToken } from "../../utils/generateToken.js";
import { Admin } from "../../models/Staff/Admin.js";

// @ Desk Register Teacher
// @ Route POST api/v1/teacher/admin/register
// @ Access Private

export const adminRegisterTeacher = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Find the admin
  const admin = await Admin.findById(req.userAuth._id);
  if (!admin) {
    throw new Error("Admin not found.");
  }
  // Check if teacher already exist
  const teacher = await Teacher.findOne({ email });
  if (teacher) {
    throw new Error("Teacher mail id already existed.");
  }

  // Hasing Password
  const hasPassword = await encryptPassword(password);

  const createTeacher = await Teacher.create({
    name,
    email,
    password: hasPassword,
  });

  //  Push teacher into admin model

  admin.teachers.push(createTeacher?._id);
  await admin.save();

  res.status(201).json({
    success: true,
    message: "Teacher registered Successfully",
    createTeacher,
  });
});

// @ Desk Login Teacher
// @ Route POST api/v1/teacher/login
// @ Access Public

export const loginTeacher = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    throw new Error("Invalid Login Credentials.");
  }
  const isPassMached = await decryptPassword(password, teacher.password);
  console.log(isPassMached);

  if (!isPassMached) {
    throw new Error("Invalid Login Credentials.");
  }

  const token = generateToken(teacher._id);

  const teach = teacher._doc;

  return res.json({
    status: "Success",
    message: "Teacher Logged-In Successfully",
    data: { ...teach, token },
  });
});

// @ Desk Get All Teachers
// @ Route POST api/v1/teacher/admin
// @ Access Private Admin Only

export const getAllTeachersAdmin = asyncHandler(async (req, res) => {
  res.status(200).json(res.result)
});

// @ Desk Get Single Teacher
// @ Route POST api/v1/teacher/:teacherID/admin
// @ Access Private Admin Only

export const getTeacherByAdmin = asyncHandler(async (req, res) => {
  const teacherID = req.params.teacherID;
  // Fins the teacher by Admin
  const teacher = await Teacher.findById(teacherID);

  if (!teacher) throw new Error("Teacher not found");

  return res.json({
    status: "Success",
    data: teacher,
    message: "Teacher Featched Successfully",
  });
});

// @ Desk Teacher Profile
// @ Route POST api/v1/teachers/profile
// @ Access Private Teacher Only

export const getTeacherProfile = asyncHandler(async (req, res) => {
  // Fins the teacher by Admin
  const teacher = await Teacher.findById(req.userAuth?._id).select(
    "-password -createdAt -updatedAt"
  );

  if (!teacher) throw new Error("Teacher not found");

  return res.json({
    status: "Success",
    message: "Teacher Featched Successfully",
    data: teacher,
  });
});

// @ Desk Teacher Update Profile
// @ Route POST api/v1/teachers/:teacherID/update
// @ Access Teacher Only

export const teacherUpadateProfile = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  // If email is taken
  const existEmail = await Teacher.findOne({ email });

  if (existEmail) {
    throw new Error("Email is already taken / exist");
  }

  // Check if admin is updating the password
  if (password) {
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await encryptPassword(password),
        name,
      },
      { new: true }
    );

    res.status(201).json({
      status: "Success",
      message: "Teacher upated successfully",
      data: teacher,
    });
  } else {
    const upadatedTeacher = await Teacher.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
      },
      { new: true }
    );

    res.status(201).json({
      status: "Success",
      message: "Teacher updated successfully",
      data: upadatedTeacher,
    });
  }
});

// @ Desk Admin Update Teacher
// @ Route POST api/v1/teachers/:teacherID/admin
// @ Access Teacher Only

export const adminUpadateTeacher = asyncHandler(async (req, res) => {
  const { subject, program, classLevel, academicYear } = req.body;

  // Find Teacher
  const teacherFound = await Teacher.findById(req.params.teacherID);

  if (!teacherFound) {
    throw new Error("Teacher Not Found");
  }

  // Checking if teacher Withdrawn
  if (teacherFound.isWitdrawn) {
    throw new Error("Action can not be Done, as teacher was withdrawn.");
  }
  // Assign Program
  if (program) {
    teacherFound.program = program;
    await teacherFound.save();
  }

  // Assign classLevel
  if (classLevel) {
    teacherFound.classLevel = classLevel;
    await teacherFound.save();
  }

  // Assign academicYear
  if (classLevel) {
    teacherFound.academicYear = academicYear;
    await teacherFound.save();
  }

  // Assign subject
  if (classLevel) {
    teacherFound.subject = subject;
    await teacherFound.save();
  }

  res.status(201).json({
    status: "Success",
    message: "Teacher updated successfully",
    data: teacherFound,
  });
});
