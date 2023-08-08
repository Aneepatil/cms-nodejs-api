import { Admin } from "../../models/Staff/Admin.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../../utils/generateToken.js";
import { decryptPassword, encryptPassword } from "../../utils/helper.js";

// Admin Register
export const registerCtrl = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminFound = await Admin.findOne({ email });
  if (adminFound) res.json({ message: "Admin already exist.." });

  const user = await Admin.create({
    name,
    email,
    password: await encryptPassword(password),
  });

  res
    .status(201)
    .json({ success: true, message: "Admin registered Successfully", user });
});

// Admin Login
export const loginCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  const isPassMached = decryptPassword(password, user.password);

  if (user && isPassMached) {
    const token = generateToken(user._id);

    const { password, ...other } = user._doc;

    return res.json({
      data: { ...other, token },
      message: "Admin Logged-In Successfully",
    });
  } else {
    return res.json({ message: "Invalid Login Credentials." });
  }
});

// Get All Admin
export const getAdminsCtrl = asyncHandler(async (req, res) => {
  res.status(200).json(res.result);
});

// Get Admin PRofile
export const getAdminProfileCtrl = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id)
    .select("-password -createdAt -updatedAt")
    .populate("academicYears")
    .populate("academicTerms")
    .populate("programs")
    .populate("yearGroups")
    .populate("classLevels")
    .populate("teachers")
    .populate("students");

  if (!admin) {
    throw new Error("Admin Not Found");
  } else {
    res.status(200).json({
      status: "Success",
      data: admin,
      message: "Admin Profile Fetched Successfully",
    });
  }
});

// Update Admin
export const updateAdminCtrl = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  // If email is taken
  const existEmail = await Admin.findOne({ email });

  if (existEmail) {
    throw new Error("Email is already taken / exist");
  }

  // Check if admin is updating the password
  if (password) {
    const admin = await Admin.findByIdAndUpdate(
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
      message: "Admin upated successfully",
      data: admin,
    });
  } else {
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
      },
      { new: true }
    );

    res.status(201).json({
      status: "Success",
      message: "Admin upated successfully",
      data: admin,
    });
  }
});

// Delete Admin
export const deleteAdminCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, message: "Admin Deleted" });
});

// Admin Suspending teacher
export const adminSuspendTeacherCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, message: "Admin susoended teacher" });
});

// Admin Un-suspending teacher
export const adminUnSuspendTeacherCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, message: "Admin Unsuspended teacher" });
});

// Admin Withdraw teacher
export const adminWithdrawTeacherCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, message: "Admin Withdraw teacher" });
});

// Admin Un-Withdraw teacher
export const adminUnWithdrawTeacherCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, message: "Admin Unwithdraw teacher" });
});

// Admin Publishes exam result
export const adminPublichExamResultCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, message: "Admin Publish result" });
});

// Admin Un-Publishes exam result
export const adminUnPublichExamResultCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, message: "Admin Un-Publish result" });
});
