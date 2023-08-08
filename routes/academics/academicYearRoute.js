import express from "express";
import { createAcademicYearCtrl, deleteAcademicYearCtrl, getAcademicYearCtrl, getAcademicYearsCtrl, updateAcademicYearCtrl } from "../../controllers/academics/academicYearCtrl.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { Admin } from "../../models/Staff/Admin.js";
import { isAuthorized } from "../../middlewares/isAuthorized.js";

const acadecYearRouter = express.Router();


acadecYearRouter.post('/',isAuthenticated(Admin),isAuthorized('admin'), createAcademicYearCtrl)
acadecYearRouter.get('/', getAcademicYearsCtrl)
acadecYearRouter.get('/:id',isAuthenticated(Admin),isAuthorized('admin'), getAcademicYearCtrl)
acadecYearRouter.put('/:id',isAuthenticated(Admin),isAuthorized('admin'), updateAcademicYearCtrl)
acadecYearRouter.delete('/:id',isAuthenticated(Admin),isAuthorized('admin'), deleteAcademicYearCtrl)

export default acadecYearRouter;
