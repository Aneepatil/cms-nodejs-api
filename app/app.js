import express from "express";
import morgan from "morgan";
import adminRouter from "../routes/admin/adminRoute.js";
import { globalErrorHanlder, notFound } from "../middlewares/globalErrorHanlder.js";
import acadecYearRouter from "../routes/academics/academicYearRoute.js";
import academicTermRouter from "../routes/academics/academicTermRoute.js";
import classLevelRouter from "../routes/academics/classLevelRoute.js";
import programRouter from "../routes/academics/programRoute.js";
import subjectRouter from "../routes/academics/subjectRoute.js";
import yearGroupRouter from "../routes/academics/yearGroupRoute.js";
import teachersRoute from "../routes/staff/teachersRoute.js";
import examRouter from "../routes/academics/examRouter.js";
import studentRoute from "../routes/students/studentsRoute.js";
import questionRouter from "../routes/academics/questionsRoute.js";
import examResultRouter from "../routes/academics/examResultRouter.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json())


// Routes
app.use('/api/v1/admins',adminRouter)
app.use('/api/v1/academic-year',acadecYearRouter)
app.use('/api/v1/academic-term',academicTermRouter)
app.use('/api/v1/class-levels',classLevelRouter)
app.use('/api/v1/programs',programRouter)
app.use('/api/v1/subjects',subjectRouter)
app.use('/api/v1/year-groups',yearGroupRouter)
app.use('/api/v1/teachers',teachersRoute)
app.use('/api/v1/exams',examRouter)
app.use('/api/v1/students',studentRoute)
app.use('/api/v1/questions',questionRouter)
app.use('/api/v1/exam-results',examResultRouter)

// Global Error Handler
app.use(notFound)
app.use(globalErrorHanlder)

export default app;
