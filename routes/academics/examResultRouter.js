import express from "express";
import { adminPublishExamResult, checkExamResult, getAllExamResult } from "../../controllers/academics/examResultCtrl.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { Student } from "../../models/Students/Student.js";
import { isAuthorized } from "../../middlewares/isAuthorized.js";

const examResultRouter = express.Router();


examResultRouter.get('/',isAuthenticated(Student),isAuthorized('student'), getAllExamResult)
examResultRouter.get('/:examResultID/checking',isAuthenticated(Student),isAuthorized('student'),checkExamResult)
examResultRouter.put('/:examResultID/admin-publish',isAuthenticated('admin'),isAuthorized('admin'), adminPublishExamResult)

export default examResultRouter;
