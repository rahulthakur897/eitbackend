import express from "express";
import { userLogin, registerUser, forgotPwd } from "../app/controller/auth.controller.js";
const router = express.Router();

router.post("/login", userLogin);
router.post("/register", registerUser);
router.post("/forgot", forgotPwd);

export default router;
