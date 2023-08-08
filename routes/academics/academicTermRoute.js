import express from "express";
import { createAcademicTermCtrl, deleteAcademicTermCtrl, getAcademicTermCtrl, getAcademicTermsCtrl, updateAcademicTermCtrl } from "../../controllers/academics/academicTermCtrl.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { Admin } from "../../models/Staff/Admin.js";
import { isAuthorized } from "../../middlewares/isAuthorized.js";

const academicTermRouter = express.Router();


academicTermRouter.post('/',isAuthenticated(Admin),isAuthorized('admin'), createAcademicTermCtrl)
academicTermRouter.get('/', getAcademicTermsCtrl)
academicTermRouter.get('/:id',isAuthenticated(Admin),isAuthorized('admin'), getAcademicTermCtrl)
academicTermRouter.put('/:id',isAuthenticated(Admin),isAuthorized('admin'), updateAcademicTermCtrl)
academicTermRouter.delete('/:id',isAuthenticated(Admin),isAuthorized('admin'), deleteAcademicTermCtrl)

export default academicTermRouter;
