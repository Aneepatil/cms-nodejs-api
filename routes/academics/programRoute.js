import express from "express";
import { createProgramCtrl, deleteProgramCtrl, getProgramCtrl, getProgramsCtrl, updateProgramCtrl } from "../../controllers/academics/programsCtrl.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { Admin } from "../../models/Staff/Admin.js";
import { isAuthorized } from "../../middlewares/isAuthorized.js";

const programRouter = express.Router();


programRouter.post('/',isAuthenticated(Admin),isAuthorized('admin'), createProgramCtrl)
programRouter.get('/', getProgramsCtrl)
programRouter.get('/:id',isAuthenticated(Admin),isAuthorized('admin'), getProgramCtrl)
programRouter.put('/:id',isAuthenticated(Admin),isAuthorized('admin'), updateProgramCtrl)
programRouter.delete('/:id',isAuthenticated(Admin),isAuthorized('admin'), deleteProgramCtrl)

export default programRouter;
