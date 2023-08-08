import express from "express";
import { createQuestion, getQuestionCtrl, getQuestionsCtrl, updateQuestionCtrl } from "../../controllers/academics/questionsCtrl.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { Teacher } from "../../models/Staff/Teacher.js";
import { isAuthorized } from "../../middlewares/isAuthorized.js";

const questionRouter = express.Router();


questionRouter.post('/:examID',isAuthenticated(Teacher),isAuthorized('teacher'), createQuestion)
questionRouter.get('/',isAuthenticated(Teacher),isAuthorized('teacher'), getQuestionsCtrl)
questionRouter.get('/:questionID',isAuthenticated(Teacher),isAuthorized('teacher'), getQuestionCtrl)
questionRouter.put('/update/:questionID',isAuthenticated(Teacher),isAuthorized('teacher'), updateQuestionCtrl)

export default questionRouter;
