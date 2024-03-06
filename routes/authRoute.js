import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {registerController, loginController, testController} from '../controllers/authController.js'
import { isAdmin } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

// test rooutes
router.get('/test',requireSignIn,isAdmin,testController);

export default router;
