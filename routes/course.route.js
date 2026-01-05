import express from "express";
import { getPopularCourses, getAllCourses } from "../app/controller/courses.controller.js";
const router = express.Router();

router.get("/popular", getPopularCourses);
router.get('/all', getAllCourses)

export default router;
