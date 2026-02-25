import express from "express";
import { userLogin, registerUser, forgotPwd , adminLogin} from "../app/controller/auth.controller.js";
const router = express.Router();

router.post("/admin/login", adminLogin);
router.post("/login", userLogin);
router.post("/register", registerUser);
router.post("/forgot", forgotPwd);

export default router;
