import asyncHandler from "express-async-handler";
import { AcademicYear } from "../../models/Academic/AcademicYear.js";
import { Admin } from "../../models/Staff/Admin.js";

// Create Academic Year
export const createAcademicYearCtrl = asyncHandler(async (req, res) => {
  const { name, fromYear, toYear, createdBy } = req.body;

  //  Checking if academic year exist
  const academicYear = await AcademicYear.findOne({ name });

  if (academicYear) {
    throw new Error("Academic Year Already Exist..");
  }

  //  Create
  const createAcademicYear = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth._id,
  });

  // Push the academic into the Admin

  const admin = await Admin.findById(req.userAuth._id);

  admin.academicYears.push(createAcademicYear._id);

  admin.save();

  res.status(201).json({
    status: "Success",
    message: "Academic Year Created Successfully",
    data: createAcademicYear,
  });
});

// Get all Academic Years
export const getAcademicYearsCtrl = asyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find();

  res.status(201).json({
    status: "Success",
    message: "Academic Years Featched Successfully.",
    data: academicYears,
  });
});

// Get Academic Year
export const getAcademicYearCtrl = asyncHandler(async (req, res) => {
  const academicYear = await AcademicYear.findById(req.params.id);

  res.status(201).json({
    status: "Success",
    message: "Academic Year Featched Successfully.",
    data: academicYear,
  });
});

// Update Academic Year
export const updateAcademicYearCtrl = asyncHandler(async (req, res) => {
  const { name, fromYear, toYear, createdBy } = req.body;

  //  Check if Academic year exist already

  const creatingAcademicFound = await AcademicYear.findOne({ name });

  if (creatingAcademicFound) {
    throw new Error("Updating Academic Year is Already Exist");
  }

  const updatedAcademicYear = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    {
      name,
      fromYear,
      toYear,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );

  res.status(201).json({
    status: "Success",
    message: "Academic Year Updated Successfully.",
    data: updatedAcademicYear,
  });
});

// Delete Academic Year
export const deleteAcademicYearCtrl = asyncHandler(async (req, res) => {
  await AcademicYear.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "Success",
    message: "Academic Years Deleted Successfully.",
  });
});
