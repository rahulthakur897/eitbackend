import express from "express";
import { getPopularCourses, getAllCourses, getCourseMenu } from "../app/controller/courses.controller.js";
const router = express.Router();

router.get("/popular", getPopularCourses);
router.get('/all', getAllCourses)
router.get("/menu", getCourseMenu);

export default router;
