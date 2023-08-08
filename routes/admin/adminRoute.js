import express from "express";
import {
  adminPublichExamResultCtrl,
  adminSuspendTeacherCtrl,
  adminUnPublichExamResultCtrl,
  adminUnSuspendTeacherCtrl,
  adminUnWithdrawTeacherCtrl,
  adminWithdrawTeacherCtrl,
  deleteAdminCtrl,
  getAdminProfileCtrl,
  getAdminsCtrl,
  loginCtrl,
  registerCtrl,
  updateAdminCtrl,
} from "../../controllers/staffCtrl/adminCtrl.js";
import { advancedResult } from "../../middlewares/advancedResults.js";
import { Admin } from "../../models/Staff/Admin.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { isAuthorized } from "./../../middlewares/isAuthorized.js";

const adminRouter = express.Router();

adminRouter.post("/register", registerCtrl);
adminRouter.post("/login", loginCtrl);
adminRouter.get(
  "/",
  isAuthenticated("admin"),
  advancedResult(Admin),
  getAdminsCtrl
);
adminRouter.get(
  "/profile",
  isAuthenticated(Admin),
  isAuthorized("admin"),
  getAdminProfileCtrl
);
adminRouter.put("/", isAuthenticated("admin"), updateAdminCtrl);
adminRouter.delete("/:id", deleteAdminCtrl);
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherCtrl);
adminRouter.put("/un-suspend/teacher/:id", adminUnSuspendTeacherCtrl);
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacherCtrl);
adminRouter.put("/un-withdraw/teacher/:id", adminUnWithdrawTeacherCtrl);
adminRouter.put("/publish/exam/:id", adminPublichExamResultCtrl);
adminRouter.put("/un-publish/exam/:id", adminUnPublichExamResultCtrl);

export default adminRouter;
