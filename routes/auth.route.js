import express from "express";
import { userLogin, registerUser, resendOTP, verifyOTP, forgotPwd , adminLogin} from "../app/controller/auth.controller.js";
const router = express.Router();

router.post("/admin/login", adminLogin);
router.post("/login", userLogin);
router.post("/register", registerUser);
router.post("/resendotp", resendOTP);
router.post("/verify", verifyOTP);
router.post("/forgot", forgotPwd);

export default router;
