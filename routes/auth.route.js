import express from "express";
import { userLogin } from "../app/controller/auth.controller.js";
const router = express.Router();

router.post("/login", userLogin);

export default router;
