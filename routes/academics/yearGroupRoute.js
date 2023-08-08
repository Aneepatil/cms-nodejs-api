import express from "express";
import { createYearGroupCtrl, deleteYearGroupCtrl, getYearGroupCtrl, getYearGroupsCtrl, updateYearGroupCtrl } from "../../controllers/academics/yearGroupCtrl.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { Admin } from "../../models/Staff/Admin.js";
import { isAuthorized } from "../../middlewares/isAuthorized.js";

const yearGroupRouter = express.Router();


yearGroupRouter.post('/',isAuthenticated(Admin),isAuthorized('admin'), createYearGroupCtrl)
yearGroupRouter.get('/', getYearGroupsCtrl)
yearGroupRouter.get('/:id',isAuthenticated(Admin),isAuthorized('admin'), getYearGroupCtrl)
yearGroupRouter.put('/:id',isAuthenticated(Admin),isAuthorized('admin'), updateYearGroupCtrl)
yearGroupRouter.delete('/:id',isAuthenticated(Admin),isAuthorized('admin'), deleteYearGroupCtrl)

export default yearGroupRouter;
