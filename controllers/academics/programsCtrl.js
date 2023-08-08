import asyncHandler from "express-async-handler";
import { Admin } from "../../models/Staff/Admin.js";
import { Program } from './../../models/Academic/Program.js ';

// Create Program
export const createProgramCtrl = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //  Checking if Program exist
  const program = await Program.findOne({ name });

  if (program) {
    throw new Error("Program Already Exist..");
  }

  //  Create
  const createProgram = await Program.create({
    name, 
    description,
    createdBy: req.userAuth._id,
  });

  // Push the academic into the Admin

  const admin = await Admin.findById(req.userAuth._id);

  admin.programs.push(createProgram._id);

  admin.save();

  res.status(201).json({
    status: "Success",
    message: "Program Created Successfully",
    data: createProgram,
  });
});

// Get all Programs
export const getProgramsCtrl = asyncHandler(async (req, res) => {
  const programs = await Program.find();

  res.status(201).json({
    status: "Success",
    message: "Programs Featched Successfully.",
    data: programs,
  });
});


// Get Program
export const getProgramCtrl = asyncHandler(async (req, res) => {
 
  const program = await Program.findById(req.params.id)

  res.status(201).json({
    status: "Success",
    message: "Program Featched Successfully.",
    data: program,
  });
});

// Update Program
export const updateProgramCtrl = asyncHandler(async (req, res) => {
  const { name, description, createdBy } = req.body;

  //  Check if Program exist already

  const creatingProgramFound = await Program.findOne({ name });

  if (creatingProgramFound) {
    throw new Error("Updating Program is Already Exist");
  }

  const updatedProgram = await Program.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );

  res.status(201).json({
    status: "Success",
    message: "Program Updated Successfully.",
    data: updatedProgram,
  });
});

// Delete Program
export const deleteProgramCtrl = asyncHandler(async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "Success",
    message: "Programs Deleted Successfully.",
  });
});
