import express from "express";
import { createExam, deleteExamCtrl, getExamCtrl, getExamsCtrl, updateExamCtrl } from "../../controllers/academics/examsCtrl.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { Teacher } from "../../models/Staff/Teacher.js";
import { isAuthorized } from "../../middlewares/isAuthorized.js";

const examRouter = express.Router();


examRouter.post('/',isAuthenticated(Teacher),isAuthorized('teacher'), createExam)
examRouter.get('/', getExamsCtrl)
examRouter.get('/:examID',isAuthenticated(Teacher),isAuthorized('teacher'), getExamCtrl)
examRouter.put('/:examID',isAuthenticated(Teacher),isAuthorized('teacher'), updateExamCtrl)
examRouter.delete('/:examID',isAuthenticated(Teacher),isAuthorized('teacher'), deleteExamCtrl)

export default examRouter;
