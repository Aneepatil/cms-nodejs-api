import asyncHandler from "express-async-handler";
import { Admin } from "../../models/Staff/Admin.js";
import { ClassLevel } from "../../models/Academic/ClassLevel.js";

// Create Class Level
export const createClassLevelCtrl = asyncHandler(async (req, res) => {
  const { name, description, createdBy } = req.body;

  //  Checking if Class Level exist
  const classLevel = await ClassLevel.findOne({ name });

  if (classLevel) {
    throw new Error("Class Level Already Exist..");
  }

  //  Create
  const createClassLevel = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });

  // Push the academic into the Admin

  const admin = await Admin.findById(req.userAuth._id);

  admin.classLevels.push(createClassLevel._id);

  admin.save();

  res.status(201).json({
    status: "Success",
    message: "Class Level Created Successfully",
    data: createClassLevel,
  });
});

// Get all Class Levels
export const getClassLevelsCtrl = asyncHandler(async (req, res) => {
  const classLevels = await ClassLevel.find();

  res.status(201).json({
    status: "Success",
    message: "Class Levels Featched Successfully.",
    data: classLevels,
  });
});


// Get Class Level
export const getClassLevelCtrl = asyncHandler(async (req, res) => {
 
  const classlevel = await ClassLevel.findById(req.params.id)

  res.status(201).json({
    status: "Success",
    message: "Class Level Featched Successfully.",
    data: classlevel,
  });
});

// Update Class Level
export const updateClassLevelCtrl = asyncHandler(async (req, res) => {
  const { name, description, createdBy } = req.body;

  //  Check if Class Level exist already

  const creatingClassLevelFound = await ClassLevel.findOne({ name });

  if (creatingClassLevelFound) {
    throw new Error("Updating Class Level is Already Exist");
  }

  const updatedClassLevel = await ClassLevel.findByIdAndUpdate(
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
    message: "Class Level Updated Successfully.",
    data: updatedClassLevel,
  });
});

// Delete Class Level
export const deleteClassLevelCtrl = asyncHandler(async (req, res) => {
  await ClassLevel.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "Success",
    message: "Class Levels Deleted Successfully.",
  });
});
