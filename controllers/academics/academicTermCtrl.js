import asyncHandler from "express-async-handler";
import { Admin } from "../../models/Staff/Admin.js";
import { AcademicTerm } from './../../models/Academic/AcademicTerm.js';

// Create Academic Year
export const createAcademicTermCtrl = asyncHandler(async (req, res) => {
  const { name, description, duration, createdBy} = req.body;

  //  Checking if academic year exist
  const academicTerm = await AcademicTerm.findOne({ name });

  if (academicTerm) {
    throw new Error("Academic Year Already Exist..");
  }

  //  Create
  const createAcademicTerm = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });

  // Push the academic into the Admin

  const admin = await Admin.findById(req.userAuth._id);

  admin.academicTerms.push(createAcademicTerm._id);

  admin.save();

  res.status(201).json({
    status: "Success",
    message: "Academic Year Created Successfully",
    data: createAcademicTerm,
  });
});




// Get all Academic Years
export const getAcademicTermsCtrl = asyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find();

  res.status(201).json({
    status: "Success",
    message: "Academic Terms Featched Successfully.",
    data: academicTerms,
  });
});



// Get Academic Year
export const getAcademicTermCtrl = asyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.findById(req.params.id);

  res.status(201).json({
    status: "Success",
    message: "Academic Term Featched Successfully.",
    data: academicTerm,
  });
});




// Update Academic Year
export const updateAcademicTermCtrl = asyncHandler(async (req, res) => {
  const { name, description, duration, createdBy } = req.body;

  //  Check if Academic Term exist already

  const creatingAcademicTermFound = await AcademicTerm.findOne({ name });

  if (creatingAcademicTermFound) {
    throw new Error("Updating Academic Term is Already Exist");
  }

  const updatedAcademicTerm = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      duration,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );

  res.status(201).json({
    status: "Success",
    message: "Academic Term Updated Successfully.",
    data: updatedAcademicTerm,
  });
});




// Delete Academic Year
export const deleteAcademicTermCtrl = asyncHandler(async (req, res) => {
  await AcademicTerm.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "Success",
    message: "Academic Term Deleted Successfully.",
  });
});
