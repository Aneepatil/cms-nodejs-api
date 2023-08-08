import express from "express";
import { createClassLevelCtrl, deleteClassLevelCtrl, getClassLevelCtrl, getClassLevelsCtrl, updateClassLevelCtrl } from "../../controllers/academics/classLevelCtrl.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { Admin } from "../../models/Staff/Admin.js";
import { isAuthorized } from "../../middlewares/isAuthorized.js";

const classLevelRouter = express.Router();


classLevelRouter.post('/',isAuthenticated(Admin),isAuthorized('admin'), createClassLevelCtrl)
classLevelRouter.get('/', getClassLevelsCtrl)
classLevelRouter.get('/:id',isAuthenticated(Admin),isAuthorized('admin'), getClassLevelCtrl)
classLevelRouter.put('/:id',isAuthenticated(Admin),isAuthorized('admin'), updateClassLevelCtrl)
classLevelRouter.delete('/:id',isAuthenticated(Admin),isAuthorized('admin'), deleteClassLevelCtrl)

export default classLevelRouter;
