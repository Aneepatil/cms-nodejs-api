import express from "express";
import { createSubjectCtrl, deleteSubjectCtrl, getSubjectCtrl, getSubjectsCtrl, updateSubjectCtrl } from "../../controllers/academics/subjectCtrl.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { Admin } from "../../models/Staff/Admin.js";
import { isAuthorized } from "../../middlewares/isAuthorized.js";

const subjectRouter = express.Router();


subjectRouter.post('/:programID',isAuthenticated(Admin),isAuthorized('admin'), createSubjectCtrl)
subjectRouter.get('/', getSubjectsCtrl)
subjectRouter.get('/:id',isAuthenticated(Admin),isAuthorized('admin'), getSubjectCtrl)
subjectRouter.put('/:id',isAuthenticated(Admin),isAuthorized('admin'), updateSubjectCtrl)
subjectRouter.delete('/:id',isAuthenticated(Admin),isAuthorized('admin'), deleteSubjectCtrl)

export default subjectRouter;
