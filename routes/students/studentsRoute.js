import express from "express";
import { adminRegisterStudent, adminUpadateStudent, getAllStudentsByAdmin, getStudentByAdmin, getStudentProfile, loginStudent, studentUpadateProfile, writeExamCtrl } from "../../controllers/students/studentsCtrl.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { Student } from "../../models/Students/Student.js";
import { Admin } from "../../models/Staff/Admin.js";
import { isAuthorized } from "../../middlewares/isAuthorized.js";
import { advancedResult } from './../../middlewares/advancedResults.js';

const studentRoute = express.Router();

studentRoute.post("/admin/register",isAuthenticated(Admin),isAuthorized('admin'), adminRegisterStudent);
studentRoute.post("/login", loginStudent);
studentRoute.get('/profile',isAuthenticated(Student),isAuthorized('student'), getStudentProfile)
studentRoute.get('/admin',isAuthenticated(Admin),isAuthorized('admin'),advancedResult(Student), getAllStudentsByAdmin)
studentRoute.get('/:studentID/admin',isAuthenticated(Admin),isAuthorized('admin'), getStudentByAdmin)
studentRoute.put('/:studentID/update',isAuthenticated(Student),isAuthorized('student'), studentUpadateProfile)
studentRoute.put('/:studentID/update/admin',isAuthenticated(Admin),isAuthorized('admin'), adminUpadateStudent)
studentRoute.post('/exam/:examID/write',isAuthenticated(Student),isAuthorized('student'), writeExamCtrl)

export default studentRoute;
