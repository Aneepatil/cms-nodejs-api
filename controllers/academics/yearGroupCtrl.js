import asyncHandler from "express-async-handler";
import { Subject } from '../../models/Academic/Subject.js';
import { Program } from '../../models/Academic/Program.js';
import { YearGroup } from "../../models/Academic/YearGroup.js";
import { Admin } from "../../models/Staff/Admin.js";

// Create yearGroups
export const createYearGroupCtrl = asyncHandler(async (req, res) => {
  const { name,academicYear } = req.body;

  // Program found
  const yearGroupFound = await YearGroup.findById(req.params.programID)
  if (yearGroupFound) {
    throw new Error("Year Group is already existed..");
  }
  //  Create
  const createYearGroup = await YearGroup.create({
    name, 
    academicYear,
    createdBy: req.userAuth._id,
  });

  // Push the Year Group into the Admin

  const admin = await Admin.findById(req.userAuth._id);
  if(!admin){
    throw new Error('Admin not found.')
  }
  admin.yearGroups.push(createYearGroup._id);

  admin.save();

  res.status(201).json({
    status: "Success",
    message: "YearGroup Created Successfully",
    data: createYearGroup,
  });
});

// Get all yearGroups
export const getYearGroupsCtrl = asyncHandler(async (req, res) => {
  const yearGroups = await YearGroup.find();

  res.status(201).json({
    status: "Success",
    message: "yearGroups Featched Successfully.",
    data: yearGroups,
  });
});


// Get yearGroups
export const getYearGroupCtrl = asyncHandler(async (req, res) => {
 
  const yearGroup = await YearGroup.findById(req.params.id)

  res.status(201).json({
    status: "Success",
    message: "YearGroup Featched Successfully.",
    data: yearGroup,
  });
});

// Update yearGroups
export const updateYearGroupCtrl = asyncHandler(async (req, res) => {
  const { name,academicYear } = req.body;

  //  Check if YearGroup exist already

  const creatingYearGroupFound = await YearGroup.findOne({ name });

  if (creatingYearGroupFound) {
    throw new Error("Updating YearGroup is Already Exist");
  }

  const updatedYearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    {
      name,
      academicYear,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );

  res.status(201).json({
    status: "Success",
    message: "YearGroup Updated Successfully.",
    data: updatedYearGroup,
  });
});

// Delete yearGroups
export const deleteYearGroupCtrl = asyncHandler(async (req, res) => {
  await YearGroup.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "Success",
    message: "YearGroup Deleted Successfully.",
  });
});
