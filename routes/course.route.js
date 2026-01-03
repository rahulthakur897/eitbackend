import express from "express";
import { getPopularCourses } from "../app/controller/courses.controller.js";
const router = express.Router();

router.get("/popular", getPopularCourses);

export default router;
