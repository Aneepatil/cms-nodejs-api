import asyncHandler from "express-async-handler";
import { Subject } from './../../models/Academic/Subject.js';
import { Program } from './../../models/Academic/Program.js';

// Create Subject
export const createSubjectCtrl = asyncHandler(async (req, res) => {
  const { name, description,academicTerm } = req.body;

  // Program found
  const programFound = await Program.findById(req.params.programID)
  if (!programFound) {
    throw new Error("Program Not Found..");
  }
  //  Create
  const createSubject = await Subject.create({
    name, 
    description,
    academicTerm,
    createdBy: req.userAuth._id,
  });

  // Push the Subject into the Program
    programFound.subjects.push(createSubject._id);
  // Save the program
  await programFound.save();

  res.status(201).json({
    status: "Success",
    message: "Subject Created Successfully",
    data: createSubject,
  });
});

// Get all Subjects
export const getSubjectsCtrl = asyncHandler(async (req, res) => {
  const subjects = await Subject.find();

  res.status(201).json({
    status: "Success",
    message: "Subjects Featched Successfully.",
    data: subjects,
  });
});


// Get Subject
export const getSubjectCtrl = asyncHandler(async (req, res) => {
 
  const subject = await Subject.findById(req.params.id)

  res.status(201).json({
    status: "Success",
    message: "Subject Featched Successfully.",
    data: subject,
  });
});

// Update Subject
export const updateSubjectCtrl = asyncHandler(async (req, res) => {
  const { name, description,academicTerm } = req.body;

  //  Check if Subject exist already

  const creatingSubjectFound = await Subject.findOne({ name });

  if (creatingSubjectFound) {
    throw new Error("Updating Subject is Already Exist");
  }

  const updatedSubject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      academicTerm,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );

  res.status(201).json({
    status: "Success",
    message: "Subject Updated Successfully.",
    data: updatedSubject,
  });
});

// Delete Subject
export const deleteSubjectCtrl = asyncHandler(async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "Success",
    message: "Subject Deleted Successfully.",
  });
});
