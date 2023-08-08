import express from "express";
import {
  adminRegisterTeacher,
  adminUpadateTeacher,
  getAllTeachersAdmin,
  getTeacherByAdmin,
  getTeacherProfile,
  loginTeacher,
  teacherUpadateProfile,
} from "../../controllers/staffCtrl/teacherCtrl.js";
import { advancedResult } from "../../middlewares/advancedResults.js";
import { Teacher } from "../../models/Staff/Teacher.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { isAuthorized } from './../../middlewares/isAuthorized.js';
import { Admin } from "../../models/Staff/Admin.js";

const teachersRoute = express.Router();

teachersRoute.post(
  "/admin/register",
  isAuthenticated(Admin),
  isAuthorized('admin'),
  adminRegisterTeacher
);

teachersRoute.post("/login", loginTeacher);

teachersRoute.get(
  "/admin",
  isAuthenticated(Admin),
  isAuthorized('admin'),
  advancedResult(Teacher, {
    path: "examCreated",
    populate: {
      path: "questions",
    },
  }),
  getAllTeachersAdmin
);

teachersRoute.get("/:teacherID/admin", isAuthenticated(Admin), isAuthorized('admin'), getTeacherByAdmin);

teachersRoute.get("/profile", isAuthenticated(Teacher), isAuthorized('teacher'), getTeacherProfile);

teachersRoute.put(
  "/:teacherID/update",
  isAuthenticated(Teacher),
  isAuthorized('teacher'),
  teacherUpadateProfile
);

teachersRoute.put(
  "/:teacherID/update/admin",
  isAuthenticated(Admin),
  isAuthorized('admin'),
  adminUpadateTeacher
);

export default teachersRoute;
