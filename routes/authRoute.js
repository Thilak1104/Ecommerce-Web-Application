import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {registerController, loginController, forgotPasswordController, testController} from '../controllers/authController.js'
import { isAdmin } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post('/forgot-password',forgotPasswordController)

// test rooutes
router.get('/test',requireSignIn,isAdmin,testController);

//protected route auth
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
export default router;
